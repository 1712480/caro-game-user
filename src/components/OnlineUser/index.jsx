import React, { useState } from 'react';

import {
  Button,
  UncontrolledCollapse,
  ListGroup,
  ListGroupItem,
  Card,
  Modal,
  ModalBody,
} from 'reactstrap';

import css from './css.module.scss';

const OnlineUser = (props) => {
  const {
    socket,
  } = props;
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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
                <ListGroupItem key={item.email} onClick={() => { toggle(); }}>
                  {item.fullName || item.email}
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </Card>
      </UncontrolledCollapse>
      <Modal isOpen={modal} fade={false} toggle={toggle} style={{ width: 250 }}>
        <ModalBody>
          <Button style={{ width: '40%', margin: '10px' }} color="danger" onClick={toggle}>Invite</Button>
          <Button style={{ width: '40%', margin: '10px' }} onClick={toggle}>Cancel</Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default OnlineUser;
