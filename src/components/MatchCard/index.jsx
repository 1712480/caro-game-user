import React, { useState } from 'react';
import { Button, Card, CardTitle, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import css from './css.module.scss';
import { selectUser } from '../../redux/userSlice';

const MatchCard = ({ roomId, roomName, x, y, password, socket }) => {
  const [currentUser] = useState(useSelector(selectUser));
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [inputPassword, setInputPassword] = useState('');

  const closeModal = () => setModal(false);
  const toggle = () => {
    setModal(!modal);
  };

  const handleGoToRoom = () => {
    if (!password) {
      socket.emit('joined', { roomId, currentUser });
      router.push(`/match/${roomId}`);
    } else {
      toggle();
    }
  };

  const joinGameWithPassword = () => {
    if (password === inputPassword) {
      socket.emit('joined', { roomId, currentUser });
      router.push(`/match/${roomId}`);
    }
  };

  const changeInputPassword = (e) => {
    const { value } = e.target;
    setInputPassword(value);
  };

  return (
    <>
      <Card className={css.card} onClick={handleGoToRoom}>
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
        <div className={css.lock}>
          {password ? <img src="/padlock.svg" alt="" /> : null}
        </div>
      </Card>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Input type="password" value={inputPassword} onChange={changeInputPassword} />
        </ModalBody>

        <ModalFooter className={css.footerModal}>
          <Button style={{ width: '48%' }} color="warning" onClick={joinGameWithPassword}>Join</Button>
          <Button style={{ width: '48%' }} onClick={closeModal}>Cancel</Button>
        </ModalFooter>

      </Modal>
    </>
  );
};

export default MatchCard;
