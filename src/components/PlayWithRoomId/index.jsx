import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Card, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import css from '../../pages/home/css.module.scss';
import { selectUser } from '../../redux/userSlice';

const PlayWithRoomID = ({ socket }) => {
  const [modal, setModal] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [currentUser] = useState(useSelector(selectUser));

  const toggle = () => setModal(!modal);

  const joinGame = (e) => {
    e.preventDefault();
    socket.emit('joined', { roomId, currentUser });
    toast.error('RoomID not available!');
  };

  const setRoom = (e) => {
    const id = e.target.value;
    setRoomId(id);
  };

  return (
    <>
      <Card className={css.plus} onClick={toggle}>
        <img src="/console.svg" alt="lock" />
        <div>Play with room Id</div>
      </Card>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>Input Room Id</ModalHeader>
        <ModalBody>
          <form onSubmit={joinGame}>
            <Input onChange={setRoom} />
            <Button type="submit" color="warning" style={{ width: '100%', marginTop: 20, marginBottom: 20 }}>Join</Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PlayWithRoomID;
