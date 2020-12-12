import React from 'react';
import styles from './styles.module.scss';

function Square({ x, y, value }) {
  const clickBtn = () => {
    console.log(x, y);
  };

  return (
    <button className={styles.btn} type="button" onClick={clickBtn}>{value === 1 ? 'X' : 'O'}</button>
  );
}

export default Square;
