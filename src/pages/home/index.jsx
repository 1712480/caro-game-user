import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Container, Card, Spinner } from 'reactstrap';

import { selectUser } from '../../redux/userSlice';
import OnlineUser from '../../components/OnlineUser';
import MatchCard from '../../components/MatchCard';
import { useAuth } from '../../components/AuthProvider';

import CreateSecretRoom from '../../components/CreateSecretRoom';
import QuickPlay from '../../components/QuickPlay';
import PlayWithRoomID from '../../components/PlayWithRoomId';
import css from './css.module.scss';

const Home = (props) => {
  const { socket } = props;
  const [currentUser] = useState(useSelector(selectUser));
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    socket.emit('client-login', currentUser);
    socket.emit('get-rooms');
  }, [currentUser, socket]);

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Spinner className={css.spinner} />;
  }

  // When first enter home page
  socket.on('rooms', (response) => {
    setRooms(response);
  });

  // When a user create new room
  socket.on('active-rooms', (response) => {
    setRooms(response);
  });

  const createNewRoom = () => {
    const { user } = currentUser;
    const name = user.fullName ? user.fullName : user.email;

    const roomID = uuid();

    const newRoom = {
      x: {
        username: user.email,
        fullName: user.fullName,
      },
      y: null,
      roomName: `${name}'s room`,
      roomId: roomID,
    };

    socket.emit('create-room', newRoom);
    router.push(`/match/${newRoom.roomId}`);
  };

  const renderCardList = rooms && rooms.map((room) => (
    <MatchCard {...room} key={room.roomId} socket={socket} />
  ));

  return (
    <Container className={css.container}>
      <Container className={css.grid}>
        <Card className={css.plus} onClick={createNewRoom}>
          <img src="/plus.svg" alt="plus" />
          <div>Create Room</div>
        </Card>
        <CreateSecretRoom socket={socket} />
        <QuickPlay socket={socket} createNewRoom={createNewRoom} />
        <PlayWithRoomID socket={socket} />
        {renderCardList}
      </Container>
      <OnlineUser user={currentUser} socket={socket} />
    </Container>
  );
};

export default Home;
