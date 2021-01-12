import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { selectUser } from '../../../redux/userSlice';
import { exeMove } from '../../../redux/currentMatch';

function Square({ x, y, value, socket, roomId }) {
  const [currentUser] = useState(useSelector(selectUser));
  const matchId = useSelector((state) => state.match.matchId);
  const userPlaying = useSelector((state) => state.match.userPlaying);
  const isEndGame = useSelector((state) => state.match.isEndGame);
  const myTurn = useSelector((state) => state.match.isTurnX);
  const currentMove = useSelector((state) => state.match.currentMove);
  const dispatch = useDispatch();
  const isCurrentMove = currentMove.x === x && currentMove.y === y;

  const clickBtn = () => {
    if (value === 0 && !isEndGame && myTurn) {
      if (currentUser.user.email !== userPlaying.host?.username
        && currentUser.user.email !== userPlaying.competitor?.username) {
        return;
      }
      socket.emit('client-make-move', {
        player: currentUser.user.email, move: { x, y }, roomId, matchId,
      });
      const action = exeMove({ x, y });
      dispatch(action);
    }
  };

  switch (value) {
  case 1:
    return (
      <button style={{ color: 'red' }} className={styles.btn} type="button" onClick={clickBtn}>
        {!isCurrentMove ? 'X' : <b>X</b>}
      </button>
    );
  case 2:
    return (
      <button style={{ color: 'green' }} className={styles.btn} type="button" onClick={clickBtn}>
        {!isCurrentMove ? 'O' : <b>O</b>}
      </button>
    );
  default:
    return <button className={styles.btn} type="button" onClick={clickBtn}>{' '}</button>;
  }
}
export default Square;
