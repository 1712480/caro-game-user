import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { exeMove } from '../../../redux/currentMatch';
import { selectUser } from '../../../redux/userSlice';

function Square({ x, y, value, socket, roomId }) {
  const [currentUser] = useState(useSelector(selectUser));
  const isEndGame = useSelector((state) => state.match.isEndGame);
  const dispatch = useDispatch();
  const clickBtn = () => {
    if (value === 0 && !isEndGame) {
      // Do something with current player's turn here maybe
      socket.emit('client-make-move', { player: currentUser.user.email, move: { x, y }, roomId });
      const action = exeMove({ x, y });
      dispatch(action);
    }
  };

  socket.on(`server-resp-move${roomId}`, (response) => {
    // Listen to opponent's move
    if (response.player !== currentUser.user.email) {
      const action = exeMove({ x: response.move.x, y: response.move.y });
      dispatch(action);
    }
  });

  switch (value) {
  case 1:
    return <button style={{ color: 'red' }} className={styles.btn} type="button" onClick={clickBtn}>X</button>;
  case 2:
    return <button style={{ color: 'green' }} className={styles.btn} type="button" onClick={clickBtn}>O</button>;
  default:
    return <button className={styles.btn} type="button" onClick={clickBtn}>{' '}</button>;
  }
}
export default Square;
