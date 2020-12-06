import React, { useEffect, useState } from 'react';

import { Button, UncontrolledCollapse, ListGroup, ListGroupItem, Card } from 'reactstrap';

import css from './css.module.scss';

const OnlineUser = (props) => {
  const { user, socket } = props;

  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on('online-users', (response) => {
      setOnlineUsers(response);
    });
  }, [onlineUsers]);

  return (
    <div className={css.container}>
      <Button color="primary" id="toggle" className={css.button}>Online users</Button>
      <UncontrolledCollapse toggler="#toggle" className={css.collapse}>
        <Card>
          <ListGroup>
            {onlineUsers.map((item, index) => (<ListGroupItem key={index}>{item}</ListGroupItem>))}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
            {/* <ListGroupItem>Item</ListGroupItem> */}
          </ListGroup>
        </Card>
      </UncontrolledCollapse>
    </div>
  );
};

export default OnlineUser;
