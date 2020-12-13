import React from 'react';
import Board from '../../components/match/board';
import styles from './styles.module.scss';
import EndGame from '../../components/match/endGame';
import UserPlaying from '../../components/match/userPlaying';

const Match = () => (
  <div className={styles.matchWrapper}>
    <UserPlaying />
    <Board />
    <UserPlaying />
    <EndGame />
  </div>
);

export default Match;
