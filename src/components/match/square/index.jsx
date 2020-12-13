import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';
import { exeMove } from '../../../redux/currentMatch';

function Square({ x, y, value }) {
  const isEndGame = useSelector((state) => state.match.isEndGame);
  const dispatch = useDispatch();
  const clickBtn = () => {
    if (value === 0 && !isEndGame) {
      const action = exeMove({ x, y });
      dispatch(action);
    }
  };

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
