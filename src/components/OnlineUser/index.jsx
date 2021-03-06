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

import { useSelector } from 'react-redux';
import css from './css.module.scss';
import { selectUser } from '../../redux/userSlice';

const OnlineUser = (props) => {
  const {
    socket,
  } = props;
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentUser] = useState(useSelector(selectUser));

  const toggle = () => setModal(!modal);

  socket.on('online-users', (response) => {
    setOnlineUsers(response);
  });

  return (
    <div className={css.container}>
      <Button color="primary" id="toggle" className={css.button}>Online users</Button>
      <UncontrolledCollapse toggler="#toggle" className={css.collapse}>
        <Card>
          <ListGroup>
            {
              onlineUsers.map((item) => {
                const disabled = currentUser?.user.email === item?.email;
                return (
                  <ListGroupItem
                    disabled={disabled}
                    className={css.item}
                    key={item?.email}
                    onClick={() => toggle(item?.email)}
                  >
                    {item.fullName || item.email}
                  </ListGroupItem>
                );
              })
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
