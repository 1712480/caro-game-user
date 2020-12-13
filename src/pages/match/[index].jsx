import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import Board from '../../components/match/board';
import styles from './styles.module.scss';
import EndGame from '../../components/match/endGame';
import UserPlaying from '../../components/match/userPlaying';
import Chat from '../../components/match/chat';
import { restartGame } from '../../redux/currentMatch';

const Match = (props) => {
  const { socket } = props;
  const param = useRouter();
  socket.on('player-join-game', (response) => {
    setTimeout(() => {
      socket.emit('request-start-game', response);
    }, 3000);
  });
  socket.on(`start-game-${param.query.index}`, () => {

  });
  socket.on('server-resp-move', () => {

  });

  const dispatch = useDispatch();
  useEffect(() => {
    const action = restartGame();
    dispatch(action);
  });
  return (
    <div className={styles.matchWrapper}>
      <div>
        <UserPlaying name="Tran Nhut Kha" img="https://res.cloudinary.com/kh-ng/image/upload/v1607835120/caro/unnamed_rwk6xo.png" />
        <UserPlaying name="Waiting..." img="https://res.cloudinary.com/kh-ng/image/upload/v1607835120/caro/unnamed_rwk6xo.png" />
      </div>
      <Board socket={socket} />
      <Chat />
      <EndGame />
      <Button style={{ position: 'fixed', top: 100, left: 50 }} color="warning">Start</Button>
    </div>
  );
};

export default Match;
