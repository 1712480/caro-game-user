import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Card, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import css from '../../pages/home/css.module.scss';
import { selectUser } from '../../redux/userSlice';

const PlayWithRoomID = ({ socket }) => {
  const [modal, setModal] = useState(false);
  const [currentUser] = useState(useSelector(selectUser));

  const toggle = () => setModal(!modal);

  const joinGame = (e) => {
    e.preventDefault();
    const id = document.getElementById('room-id-field').value;
    socket.emit('client-find-room', { roomId: id, email: currentUser?.user?.email });
  };

  useEffect(() => {
    socket.on(`server-response-found-room-${currentUser?.user?.email}`, (response) => {
      if (response?.foundRoom !== -1) {
        const room = document.getElementById(response.roomId);
        toggle();
        room.click();
      } else {
        toast.error('RoomID not available!');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card className={css.plus} onClick={toggle}>
        <img src="/console.svg" alt="lock" />
        <div>Play with room Id</div>
      </Card>
      <Modal isOpen={modal} fade toggle={toggle}>
        <ModalHeader toggle={toggle}>Input Room Id</ModalHeader>
        <ModalBody>
          <Input id="room-id-field" />
          <Button onClick={joinGame} color="warning" style={{ width: '100%', marginTop: 20, marginBottom: 20 }}>Join</Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PlayWithRoomID;
