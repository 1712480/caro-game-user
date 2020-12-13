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

const mockData = [
  {
    x: 'Tran Van Quy',
    y: 'Nguyen Hoang Thien An',
    roomName: 'Quy\'s room',
    roomId: '1',
  },
];

const Home = (props) => {
  const { socket } = props;
  const [currentUser] = useState(useSelector(selectUser));
  const [refresh, setRefresh] = useState(false);
  const [rooms, setRooms] = useState(mockData);
  const router = useRouter();

  const fireRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (!currentUser) {
      toast.error('Please login with your account first.');
      router.push('/');
    } else {
      socket.emit('client-login', currentUser);
    }
  }, [currentUser, refresh]);

  const createNewRoom = () => {
    const { user } = currentUser;
    const name = user.fullName ? user.fullName : user.email;

    setRooms(rooms.concat({
      x: name,
      y: null,
      roomName: `${name}'s room`,
      roomId: uuid(),
    }));
  };

  const handleGoToRoom = (roomId) => {
    router.push(`/match/${roomId}`);
  };

  const renderCardList = rooms && rooms.map((room) => (
    <MatchCard {...room} key={room.roomId} handleOnClick={() => handleGoToRoom(room.roomId)} />));

  return currentUser ? (
    <Container className={css.container}>
      <Container className={css.grid}>
        <Card className={css.plus} onClick={createNewRoom}>
          <img src="/plus.svg" alt="plus" />
        </Card>
        {renderCardList}
      </Container>
      <OnlineUser user={currentUser} socket={socket} refresh={fireRefresh} />
    </Container>
  ) : null;
};

export default Home;
