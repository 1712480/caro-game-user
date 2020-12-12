import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import { selectUser } from '../../redux/userSlice';
import OnlineUser from '../../components/OnlineUser';

const Index = (props) => {
  const { socket } = props;
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

  return user ? (
    <div>
      <OnlineUser user={user} socket={socket} refresh={fireRefresh} />
    </div>
  ) : null;
};

export default Index;
