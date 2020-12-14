import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import Board from '../../components/match/board';
import styles from './styles.module.scss';
import EndGame from '../../components/match/endGame';
import UserPlaying from '../../components/match/userPlaying';
import Chat from '../../components/match/chat';
import { restartGame } from '../../redux/currentMatch';
import { selectUser } from '../../redux/userSlice';

const Match = (props) => {
  const { socket } = props;
  const [currentUser] = useState(useSelector(selectUser));
  const param = useRouter();
  socket.on('player-join-game', (response) => {
    socket.emit('request-start-game', response);
  });
  socket.on(`start-game-${param.query.index}`, (response) => {
    // Do something with turn when game start
    // Checking if player is host and give turn here?
    if (response.roomDetails.y.username !== currentUser.user.email) {
      // Notify host's turn something (Modal and Stuff Would Be Nice)
      // console.log('You are host and it\'s your turn!');
    } else {
      // Notify not challenger's turn
      // console.log('Wait for host\'s first move!');
    }
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
      <Board socket={socket} roomId={param.query.index} />
      <Chat />
      <EndGame />
      <Button style={{ position: 'fixed', top: 100, left: 50 }} color="warning">Start</Button>
    </div>
  );
};

export default Match;
