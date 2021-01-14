import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';
import Board from '../../components/match/board';
import styles from './styles.module.scss';
import EndGame from '../../components/match/endGame';
import UserPlaying from '../../components/match/userPlaying';
import Chat from '../../components/match/chat';
import { exeMove, newGame, startGame } from '../../redux/currentMatch';
import { selectUser } from '../../redux/userSlice';

const Match = (props) => {
  const { socket } = props;
  const [currentUser] = useState(useSelector(selectUser));
  const [roomId] = useState(useSelector((state) => state.match.roomId));
  const matchId = useSelector((state) => state.match.matchId);
  const [competitor, setCompetitor] = useState(null);
  const [host, setHost] = useState(null);
  const myTurn = useSelector((state) => state.match.isTurnX);
  const isEndGame = useSelector((state) => state.match.isEndGame);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEndGame) {
      socket.emit('end-game', { roomId, matchId, myTurn, currentUser });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEndGame]);

  useEffect(() => {
    if (currentUser != null) {
      socket.on(`player-join-game-${router.query.index}`, (response) => {
        socket.emit('request-start-game', response);
      });

      socket.on(`start-game-${router.query.index}`, (response) => {
        const isMyTurn = response.roomDetails.y.username !== currentUser.user.email;
        const action = startGame({ ...response, myTurn: isMyTurn });
        dispatch(action);
        if (response.roomDetails.x.username === currentUser.user.email) {
          setCompetitor(response.roomDetails.y);
          setHost(response.roomDetails.x);
        } else {
          setCompetitor(response.roomDetails.x);
          setHost(response.roomDetails.y);
        }
      });

      socket.on(`server-resp-move-${router.query.index}`, (response) => {
        if (response.player !== currentUser.user.email) {
          const action = exeMove({ x: response.move.x, y: response.move.y });
          dispatch(action);
        }
      });
    }

    socket.on(`exit-room-${roomId}`, (response) => {
      const { exitUser } = response;
      if (currentUser?.user?.email !== exitUser) {
        router.push('/home');
      }
    });

    return () => {
      const action = newGame();
      dispatch(action);
      socket.emit('exit-room', { roomId: router.query.index, exitUser: currentUser?.user?.email });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyRoomId = (e) => {
    e.preventDefault();
    if (window) {
      const el = document.createElement('textarea');
      el.value = router.query.index;
      el.style.visibility = 'none';
      document.body.appendChild(el);
      el.select();
      el.focus();
      document.execCommand('copy');
      el.remove();
      toast.success('Room ID is copied to clipboard.');
    }
  };

  return (
    <div className={styles.matchWrapper}>
      <div className={styles.userPlaying}>
        <UserPlaying isCurrentUser myTurn={myTurn} name={host?.fullName} img="https://res.cloudinary.com/kh-ng/image/upload/v1607835120/caro/unnamed_rwk6xo.png" />
        <UserPlaying myTurn={!myTurn} name={competitor !== null ? competitor.fullName : 'Waiting...'} img="https://res.cloudinary.com/kh-ng/image/upload/v1607835120/caro/unnamed_rwk6xo.png" />
      </div>
      <Board socket={socket} roomId={router.query.index} />
      <div className={styles.chat}>
        <Chat socket={socket} roomId={router.query.index} />
      </div>
      <EndGame socket={socket} roomId={router.query.index} />
      <Button className={styles.button} color="warning" onClick={handleCopyRoomId}>
        <img src="/copy.svg" alt="copy" />
        {' '}
        Room ID
      </Button>
    </div>
  );
};

export default Match;
