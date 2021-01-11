import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Router from 'next/router';
import { Card, CardBody, CardTitle, ListGroup, Spinner } from 'reactstrap';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { useAuth } from '../../components/AuthProvider';
import css from './history.module.scss';
import { API_HOST, API_END_POINT } from '../../utils/constant';

const History = () => {
  const { isAuthenticated } = useAuth();
  const currentUser = useSelector((state) => state.currentUser);
  const [listMatch, setListMatch] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = currentUser?.access_token;
    if (currentUser !== null) {
      axios.get(`${API_HOST}${API_END_POINT.MY_HISTORY}`, {
        headers: {
          access_token: token,
        },
      })
        .then((res) => {
          setListMatch(res.data.data);
          setLoaded(true);
        });
    }
  }, [currentUser]);

  if (!isAuthenticated || !loaded) {
    return <Spinner className={css.spinner} />;
  }

  const renderItem = listMatch && listMatch.length ? listMatch.map((match) => {
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
  }) : <h1>Empty history</h1>;

  return (
    <ListGroup className={css.container}>
      {renderItem}
    </ListGroup>
  );
};

export default History;
