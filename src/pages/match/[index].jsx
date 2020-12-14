import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import Board from '../../components/match/board';
import styles from './styles.module.scss';
import EndGame from '../../components/match/endGame';
import UserPlaying from '../../components/match/userPlaying';
import Chat from '../../components/match/chat';
import { exeMove, restartGame, setIsTurnX } from '../../redux/currentMatch';
import { selectUser } from '../../redux/userSlice';

const Match = (props) => {
  const { socket } = props;
  const [currentUser] = useState(useSelector(selectUser));
  const param = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('player-join-game', (response) => {
      socket.emit('request-start-game', response);
    });
    socket.on(`start-game-${param.query.index}`, (response) => {
      if (response.roomDetails.y.username !== currentUser.user.email) {
        const action = setIsTurnX(false);
        dispatch(action);
      } else {
        const action = setIsTurnX(true);
        dispatch(action);
      }
    });

    socket.on(`server-resp-move${param.query.index}`, (response) => {
      if (response.player !== currentUser.user.email) {
        const action = exeMove({ x: response.move.x, y: response.move.y });
        dispatch(action);
      }
    });
    return () => {
      const action = restartGame();
      dispatch(action);
    };
  }, []);

  return (
    <div className={styles.matchWrapper}>
      <div>
        <UserPlaying name="Tran Nhut Kha" img="https://res.cloudinary.com/kh-ng/image/upload/v1607835120/caro/unnamed_rwk6xo.png" />
        <UserPlaying name="Waiting..." img="https://res.cloudinary.com/kh-ng/image/upload/v1607835120/caro/unnamed_rwk6xo.png" />
      </div>
      <Board socket={socket} roomId={param.query.index} />
      <Chat />
      <EndGame />
      <Button style={{ position: 'fixed', top: 100, left: 50 }} color="warning">Start</Button>
    </div>
  );
};

export default Match;
