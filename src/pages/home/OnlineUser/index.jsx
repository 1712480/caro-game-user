import React from 'react';

import { Button, UncontrolledCollapse, ListGroup, ListGroupItem, Card } from 'reactstrap';

import css from './css.module.scss';

const OnlineUser = () => (
  <div className={css.container}>
    <Button color="primary" id="toggle" className={css.button}>Online users</Button>
    <UncontrolledCollapse toggler="#toggle" className={css.collapse}>
      <Card>
        <ListGroup>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
          <ListGroupItem>Item</ListGroupItem>
        </ListGroup>
      </Card>
    </UncontrolledCollapse>
  </div>
);

export default OnlineUser;
