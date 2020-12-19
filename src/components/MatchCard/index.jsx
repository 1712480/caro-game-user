import React from 'react';
import { Card, CardTitle } from 'reactstrap';

import css from './css.module.scss';

const MatchCard = ({ roomId, roomName, x, y, handleOnClick }) => (
  <Card className={css.card} onClick={handleOnClick}>
    <CardTitle className={css.title}>
      {roomName || roomId}
    </CardTitle>
    <p className={css.text}>
      <b>Master: </b>
      {x.fullName}
    </p>
    <p className={css.text}>
      <b>Challenger: </b>
      {y?.fullName}
    </p>
  </Card>
);

export default MatchCard;
