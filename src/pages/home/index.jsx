import React, { useEffect, useState } from 'react';
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
  const { socket, matchList } = props;
  const [user] = useState(useSelector(selectUser));
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const fireRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (!user) {
      toast.error('Please login with your account first.');
      router.push('/');
    } else {
      socket.emit('client-login', user);
    }
  }, [user, refresh]);

  const renderCardList = matchList && matchList.map((match) => (
    <MatchCard {...match} key={match.roomId} />));

  return user ? (
    <Container className={css.container}>
      <Container className={css.grid}>
        <Card className={css.plus}>
          <img src="/plus.svg" alt="plus" />
        </Card>
        {renderCardList}
      </Container>
      <OnlineUser user={user} socket={socket} refresh={fireRefresh} />
    </Container>
  ) : null;
};

export const getStaticProps = async () => ({
  props: { matchList: mockData },
});

export default Home;
