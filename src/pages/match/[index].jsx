import { React } from 'react';
import { useRouter } from 'next/router';
import Board from '../../components/match/board';
import styles from './styles.module.scss';
import EndGame from '../../components/match/endGame';
import UserPlaying from '../../components/match/userPlaying';

const Match = (props) => {
  const { socket } = props;

  socket.on('player-join-game', (response) => {
    setTimeout(() => {
      socket.emit('request-start-game', response.roomId);
    }, 3000);
  });

  const param = useRouter();

  socket.on(`start-game-${param.query.index}`, () => {

  });

  socket.on('server-resp-move', () => {

  });

  return (
    <div
      className={styles.matchWrapper}
    >
      <UserPlaying />
      <Board socket={socket} />
      <UserPlaying />
      <EndGame />
    </div>
  );
};

export default Match;
