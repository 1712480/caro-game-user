import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Square from '../square';
import styles from './styles.module.scss';
import { selectUser } from '../../../redux/userSlice';

const RenderBoard = (data, socket, roomId) => {
  const [currentUser] = useState(useSelector(selectUser));

  socket.emit('moves', { roomId, userReload: currentUser?.user.email });

  socket.on(`server-response-moves-${roomId}`, (response) => {
    if (currentUser?.user.email === response.userReload) {
      // Response chứa ai refresh userReload và roomDetail: thông tin room.
    }
  });

  const Component = data.map((record, indexX) => {
    const recordI = record.map((sq, indexY) => (
      <Square
        // eslint-disable-next-line react/no-array-index-key
        key={`${indexX}${indexY}`}
        x={indexX}
        y={indexY}
        value={data[indexX][indexY]}
        socket={socket}
        roomId={roomId}
      />
    ));
    // eslint-disable-next-line react/no-array-index-key
    return <div key={indexX} className={styles.row}>{recordI}</div>;
  });
  return Component;
};

function Board(props) {
  const { socket, roomId } = props;
  const mapMatch = useSelector((state) => state.match.mapMatch);
  const match = RenderBoard(mapMatch, socket, roomId);

  return (
    <div className={styles.boardWrapper} style={{ lineHeight: 0 }}>
      {match}
    </div>
  );
}

export default Board;
