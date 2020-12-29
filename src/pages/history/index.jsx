import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Router from 'next/router';
import { Card, CardBody, CardTitle, ListGroup, Spinner } from 'reactstrap';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { useAuth } from '../../components/AuthProvider';
import css from './history.module.scss';
import { API_HOST } from '../../utils/constant';

const History = () => {
  const { isAuthenticated } = useAuth();
  const currentUser = useSelector((state) => state.currentUser);
  const [listMatch, setListMatch] = useState([]);

  useEffect(() => {
    const token = currentUser?.access_token;
    if (currentUser !== null) {
      axios.get(`${API_HOST}matches/my`, {
        headers: {
          access_token: token,
        },
      })
        .then((res) => {
          setListMatch(res.data.data);
        });
    }
  }, [currentUser]);

  if (!isAuthenticated) {
    return <Spinner className={css.spinner} />;
  }

  const renderItem = listMatch && listMatch.map((match) => {
    const { id, opponent, winner, date, host } = match;
    const win = winner === currentUser?.user.email;
    const realOpponent = currentUser?.user.email === opponent ? host : opponent;
    return (
      <Card key={id} className={classnames(css.history, win && css.win)} onClick={() => Router.push(`history/${id}`)}>
        <CardBody>
          <CardTitle>
            Match with
            {' '}
            <b>{realOpponent}</b>
          </CardTitle>
          <p>{date}</p>
          <img alt="status" src={win ? '/trophy.svg' : 'lose.svg'} />
        </CardBody>
      </Card>
    );
  });

  return (
    <ListGroup className={css.container}>
      {renderItem}
    </ListGroup>
  );
};

export default History;
