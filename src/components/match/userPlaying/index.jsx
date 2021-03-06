import React from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle,
} from 'reactstrap';
import styles from './styles.module.scss';

const UserPlaying = ({ name, img, myTurn, isCurrentUser }) => (
  <div className={styles.userPlayingWrapper}>
    <Card className={styles.cardUser} style={{ backgroundColor: myTurn ? 'yellow' : 'white' }}>
      <CardImg style={{ width: '80px' }} src={img} alt="Card image cap" />
      <CardBody className={styles.cardBody}>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{isCurrentUser ? 'X' : 'O'}</CardSubtitle>
      </CardBody>
    </Card>
  </div>
);

export default UserPlaying;
