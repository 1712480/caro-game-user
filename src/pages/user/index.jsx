import React from 'react';
import { Card, Container, Spinner } from 'reactstrap';

import { useSelector } from 'react-redux';
import { useAuth } from '../../components/AuthProvider';
import ChangePassword from './ChangePassword';
import ChangeName from './ChangeName';
import ChangeAvatar from './ChangeAvatar';

import css from './css.module.scss';
import { selectUser } from '../../redux/userSlice';

const User = () => {
  const { isAuthenticated } = useAuth();
  const currentUser = useSelector(selectUser);

  if (!isAuthenticated) {
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
            <div className={css.mid}>Feb 26 1999</div>
            <span className={css.right} />
          </div>
          <div className={css.card}>
            <div className={css.left}>Level</div>
            <div className={css.mid}>9000</div>
            <span className={css.right} />
          </div>
          <div className={css.card}>
            <div className={css.left}>Played</div>
            <div className={css.mid}>256 games</div>
            <span className={css.right} />
          </div>
          <div className={css.card}>
            <div className={css.left}>Win rate</div>
            <div className={css.mid}>69 %</div>
            <span className={css.right} />
          </div>
        </Card>
        <ChangePassword user={currentUser} buttonLabel="Change password" />
      </div>
    </Container>
  );
};

export default User;
