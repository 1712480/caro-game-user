import React from 'react';
import { Card, CardTitle } from 'reactstrap';

import css from './css.module.scss';

const MatchCard = ({ roomId, roomName, x, y }) => (
  <Card className={css.card}>
    <CardTitle className={css.title}>
      {roomName || roomId}
    </CardTitle>
    <p className={css.text}>
      <b>Master: </b>
      {x}
    </p>
    <p className={css.text}>
      <b>Challenger: </b>
      {y}
    </p>
  </Card>
);

export default MatchCard;
