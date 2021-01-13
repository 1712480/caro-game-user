import React, { useState, useEffect } from 'react';
import { Card, Container, Spinner } from 'reactstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { useAuth } from '../../components/AuthProvider';
import ChangePassword from './ChangePassword';
import ChangeName from './ChangeName';
import ChangeAvatar from './ChangeAvatar';

import { API_END_POINT, API_HOST } from '../../utils/constant';
import css from './css.module.scss';

const User = () => {
  const { isAuthenticated } = useAuth();
  const currentUser = useSelector((state) => state.currentUser);
  const [loaded, setLoaded] = useState(false);
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    const token = currentUser?.access_token;
    if (currentUser !== null) {
      axios.get(`${API_HOST}${API_END_POINT.USER_STATS}/my`, {
        headers: {
          access_token: token,
        },
      })
        .then((res) => {
          const { user, stats } = res.data;
          setUserStats({
            joined: (new Date(user.joinTimeStamp)).toDateString(),
            played: stats.playedGame,
            winRate: stats.winRate,
          });
        })
        .catch((err) => {
          const message = err.response.message || 'Can not get user data, please try again later.';
          toast.error(message);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (userStats) {
      setLoaded(true);
    }
  }, [userStats]);

  if (!isAuthenticated || !loaded) {
    return <Spinner className={css.spinner} />;
  }

  return (
    <Container className={css.mainContainer}>
      <div className={css.upper}>
        <ChangeAvatar />
        <div className={css.name}>
          <h3>{currentUser?.user.fullName || currentUser?.user.email}</h3>
          <ChangeName user={currentUser} />
        </div>
      </div>
      <div className={css.lower}>
        <Card className={css.stat}>
          <div className={css.card}>
            <div className={css.left}>Joined</div>
            <div className={css.mid}>{userStats.joined || 'N/A'}</div>
            <span className={css.right} />
          </div>
          <div className={css.card}>
            <div className={css.left}>Played</div>
            <div className={css.mid}>{`${userStats.played} games` || 'N/A'}</div>
            <span className={css.right} />
          </div>
          <div className={css.card}>
            <div className={css.left}>Win rate</div>
            <div className={css.mid}>{`${userStats.winRate} %` || 'N/A'}</div>
            <span className={css.right} />
          </div>
        </Card>
        <ChangePassword user={currentUser} buttonLabel="Change password" />
      </div>
    </Container>
  );
};

export default User;
