import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import Board from '../../components/match/board';
import styles from './styles.module.scss';
import EndGame from '../../components/match/endGame';
import UserPlaying from '../../components/match/userPlaying';
import Chat from '../../components/match/chat';
import { exeMove, restartGame, startGame } from '../../redux/currentMatch';
import { selectUser } from '../../redux/userSlice';

const Match = (props) => {
  const { socket } = props;
  const [currentUser] = useState(useSelector(selectUser));
  const roomId = useSelector((state) => state.match.roomId);
  const matchId = useSelector((state) => state.match.matchId);
  const [competitor, setCompetitor] = useState(null);
  const [host, setHost] = useState(null);
  const myTurn = useSelector((state) => state.match.isTurnX);
  const isEndGame = useSelector((state) => state.match.isEndGame);
  const userPlaying = useSelector((state) => state.match.userPlaying);
  const param = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEndGame) {
      socket.emit('end-game', { roomId, matchId, myTurn, currentUser });
    }
  }, [isEndGame, matchId], roomId, myTurn, currentUser);

  useEffect(() => {
    if (userPlaying.host !== null) {
      if (userPlaying?.host?.username === currentUser.user.email) {
        setCompetitor(userPlaying.competitor);
        setHost(userPlaying.host);
      } else {
        setCompetitor(userPlaying.host);
        setHost(userPlaying.competitor);
      }
    }
  }, [userPlaying]);

  useEffect(() => {
    if (currentUser != null) {
      socket.on('player-join-game', (response) => {
        socket.emit('request-start-game', response);
      });
      socket.on(`start-game-${param.query.index}`, (response) => {
        const isMyTurn = response.roomDetails.y.username !== currentUser.user.email;
        const action = startGame({ ...response, myTurn: isMyTurn });
        dispatch(action);
      });

      socket.on(`server-resp-move-${param.query.index}`, (response) => {
        if (response.player !== currentUser.user.email) {
          const action = exeMove({ x: response.move.x, y: response.move.y });
          dispatch(action);
        }
      });
    }

    return () => {
      const action = restartGame(false);
      dispatch(action);
    };
  }, [currentUser, dispatch, param.query.index, socket, currentUser.user.email]);

  return (
    <div className={styles.matchWrapper}>
      <div className={styles.userPlaying}>
        <UserPlaying isCurrentUser myTurn={myTurn} name={host?.fullName} img="https://res.cloudinary.com/kh-ng/image/upload/v1607835120/caro/unnamed_rwk6xo.png" />
        <UserPlaying myTurn={!myTurn} name={competitor !== null ? competitor?.fullName : 'Waiting...'} img="https://res.cloudinary.com/kh-ng/image/upload/v1607835120/caro/unnamed_rwk6xo.png" />
      </div>
      <Board socket={socket} roomId={param.query.index} />
      <div className={styles.chat}>
        <Chat socket={socket} roomId={param.query.index} />
      </div>
      <EndGame socket={socket} roomId={param.query.index} />
      <Button style={{ position: 'fixed', top: 100, left: 50 }} color="warning">Start</Button>
    </div>
  );
};

export default Match;
