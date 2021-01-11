import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Square from '../square';
import styles from './styles.module.scss';
import { selectUser } from '../../../redux/userSlice';
import { setTurn, reLoadGame, exeMove } from '../../../redux/currentMatch';

const RenderBoard = (data, socket, roomId) => {
  const [currentUser] = useState(useSelector(selectUser));
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit('moves', { roomId, userReload: currentUser?.user.email });
  }, [roomId]);

  useEffect(() => {
    socket.on(`server-response-moves-${roomId}`, (response) => {
      if (currentUser?.user.email === response.userReload) {
        dispatch(reLoadGame(response));
        const { length } = response?.roomDetail?.moves;
        if (length > 0) {
          const { mover } = response?.roomDetail?.moves[length - 1];
          const isTurn = mover !== currentUser?.user.email;
          dispatch(setTurn(isTurn));
          for (let i = 0; i < length; i += 1) {
            dispatch(exeMove({
              x: response?.roomDetail.moves[i].move.x,
              y: response?.roomDetail.moves[i].move.y,
            }));
          }
          dispatch(setTurn(isTurn));
        }
      }
    });
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
