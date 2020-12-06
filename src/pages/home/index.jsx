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
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      toast.error('Please login with your account first.');
      router.push('/');
    }
    console.log(user);
    socket.emit('client-connect', user);
  }, [user]);

  return user ? (
    <div>
      <OnlineUser user={user} socket={socket} />
    </div>
  ) : null;
};

export default Index;
