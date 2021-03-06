import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, ModalFooter, Card } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import css from '../../pages/home/css.module.scss';
import { selectUser } from '../../redux/userSlice';
import { createRoom } from '../../redux/currentMatch';

const CreateSecretRoom = ({ socket }) => {
  const [modal, setModal] = useState(false);
  const [currentUser] = useState(useSelector(selectUser));
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const toggle = () => setModal(!modal);

  const createNewRoom = () => {
    const { user } = currentUser;
    const name = user.fullName ? user.fullName : user.email;

    const roomID = uuid();

    const newRoom = {
      x: {
        username: user.email,
        fullName: user.fullName,
      },
      y: null,
      roomName: `${name}'s room`,
      roomId: roomID,
      password,
    };

    socket.emit('create-room', newRoom);
    dispatch(createRoom(roomID));
    router.push(`/match/${newRoom.roomId}`);
  };

  const changePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  return (
    <>
      <Card className={css.plus} onClick={toggle}>
        <img src="/padlock.svg" alt="lock" />
        <div>Create Secret Room</div>
      </Card>
      <Modal isOpen={modal} fade toggle={toggle}>
        <ModalHeader toggle={toggle}>Secret Room</ModalHeader>
        <ModalBody>
          <form>
            <Input type="password" onChange={changePassword} />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="info" style={{ width: '100%' }} onClick={createNewRoom}>Create</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateSecretRoom;
