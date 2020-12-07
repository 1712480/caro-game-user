import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import socketIOClient from 'socket.io-client';

import { selectUser } from '../../redux/userSlice';
import OnlineUser from './OnlineUser';

const socket = socketIOClient('http://localhost:3000');

const Index = () => {
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
