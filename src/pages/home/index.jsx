import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';
import { selectUser } from '../../redux/userSlice';
import OnlineUser from './OnlineUser';

const Index = () => {
  const [user] = useState(useSelector(selectUser));
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      toast.error('Please login with your account first.');
      router.push('/');
    }
  }, [user]);

  return user ? (
    <div>
      <OnlineUser />
    </div>
  ) : null;
};

export default Index;
