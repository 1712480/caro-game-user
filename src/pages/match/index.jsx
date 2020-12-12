import React from 'react';
import Board from '../../components/match/board';
import styles from './styles.module.scss';
import EndGame from '../../components/match/endGame';

const Match = (props) => (
  <div className={styles.matchWrapper}>
    <Board />
    <EndGame />
  </div>
);

export default Match;
