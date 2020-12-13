import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Container, Card } from 'reactstrap';

import { selectUser } from '../../redux/userSlice';
import OnlineUser from '../../components/OnlineUser';
import MatchCard from '../../components/MatchCard';

import css from './css.module.scss';

const Home = (props) => {
  const { socket } = props;
  const [currentUser] = useState(useSelector(selectUser));
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      toast.error('Please login with your account first.');
      router.push('/');
    } else {
      socket.emit('client-login', currentUser);
    }

    socket.emit('get-rooms');
  }, [currentUser]);

  socket.on('rooms', (response) => {
    setRooms(response);
  });

  socket.on('active-rooms', (response) => {
    setRooms(response);
  });

  socket.on('created-room', (response) => {
    router.push(`/match/${response.roomId}`);
  });

  const createNewRoom = () => {
    const { user } = currentUser;
    const name = user.fullName ? user.fullName : user.email;

    const roomID = uuid();

    const newRoom = {
      x: name,
      y: null,
      roomName: `${name}'s room`,
      roomId: roomID,
    };

    socket.emit('create-room', newRoom);
  };

  const handleGoToRoom = (roomId) => {
    socket.emit('joined', { roomId, currentUser });
    router.push(`/match/${roomId}`);
  };

  const renderCardList = rooms && rooms.map((room) => (
    <MatchCard {...room} key={room.roomId} handleOnClick={() => handleGoToRoom(room.roomId)} />
  ));

  return currentUser ? (
    <Container className={css.container}>
      <Container className={css.grid}>
        <Card className={css.plus} onClick={createNewRoom}>
          <img src="/plus.svg" alt="plus" />
        </Card>
        {renderCardList}
      </Container>
      <OnlineUser user={currentUser} socket={socket} />
    </Container>
  ) : null;
};

export default Home;
