import React from 'react';
import classnames from 'classnames';
import Router from 'next/router';
import { Card, CardBody, CardTitle, ListGroup } from 'reactstrap';

import css from './history.module.scss';

const mockData = [
  {
    id: '1',
    opponent: 'username 1',
    win: true,
    date: '2020-12-12',
  },
  {
    id: '2',
    opponent: 'username 2',
    win: false,
    date: '2020-12-12',
  },
];

const History = ({ data }) => {
  const renderItem = data && data.map((match) => {
    const { id, opponent, win, date } = match;
    return (
      <Card key={id} className={classnames(css.history, win && css.win)} onClick={() => Router.push(`history/${id}`)}>
        <CardBody>
          <CardTitle>
            Match with
            {' '}
            <b>{opponent}</b>
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

export const getStaticProps = () => ({
  props: {
    data: mockData,
  },
});

export default History;
