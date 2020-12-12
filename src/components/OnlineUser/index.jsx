import React, { useEffect, useState } from 'react';

import { Button, UncontrolledCollapse, ListGroup, ListGroupItem, Card } from 'reactstrap';

import css from './css.module.scss';

const OnlineUser = (props) => {
  const {
    socket,
    refresh,
  } = props;
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      refresh();
    }, 3000);
  });

  socket.on('online-users', (response) => {
    // Should exclude myself here
    setOnlineUsers(response);
  });

  return (
    <div className={css.container}>
      <Button color="primary" id="toggle" className={css.button}>Online users</Button>
      <UncontrolledCollapse toggler="#toggle" className={css.collapse}>
        <Card>
          <ListGroup>
            {
              onlineUsers.map((item) => (
                <ListGroupItem
                  key={item.email}
                >
                  {item.fullName || item.email}
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </Card>
      </UncontrolledCollapse>
    </div>
  );
};

export default OnlineUser;
