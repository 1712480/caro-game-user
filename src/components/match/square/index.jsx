import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { selectUser } from '../../../redux/userSlice';
import { exeMove } from '../../../redux/currentMatch';

function Square({ x, y, value, socket, roomId }) {
  const [currentUser] = useState(useSelector(selectUser));
  const isEndGame = useSelector((state) => state.match.isEndGame);
  const myTurn = useSelector((state) => state.match.isTurnX);
  const currentMove = useSelector((state) => state.match.currentMove);
  const dispatch = useDispatch();
  const isCurrentMove = currentMove.x === x && currentMove.y === y;

  const clickBtn = () => {
    if (value === 0 && !isEndGame && myTurn) {
      socket.emit('client-make-move', { player: currentUser.user.email, move: { x, y }, roomId });
      const action = exeMove({ x, y });
      dispatch(action);
    }
  };

  switch (value) {
  case 1:
    return <button style={{ color: 'red', fontWeight: isCurrentMove ? 'bold' : 'lighter' }} className={styles.btn} type="button" onClick={clickBtn}>X</button>;
  case 2:
    return <button style={{ color: 'green' }} className={styles.btn} type="button" onClick={clickBtn}>O</button>;
  default:
    return <button className={styles.btn} type="button" onClick={clickBtn}>{' '}</button>;
  }
}
export default Square;
