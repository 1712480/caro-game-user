import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Modal, ModalHeader, ModalBody, Input, Card, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import css from '../../pages/home/css.module.scss';
import { selectUser } from '../../redux/userSlice';

const PlayWithRoomID = ({ socket }) => {
  const [modal, setModal] = useState(false);
  const [currentUser] = useState(useSelector(selectUser));
  const router = useRouter();

  const toggle = () => setModal(!modal);

  const joinGame = (e) => {
    e.preventDefault();
    const id = document.getElementById('room-id-field').value;
    socket.emit('client-find-room', { roomId: id, email: currentUser?.user?.email });
  };

  useEffect(() => {
    socket.on(`server-response-found-room-${currentUser?.user?.email}`, (response) => {
      if (response?.foundRoom !== -1) {
        socket.emit('joined', { roomId: response.roomId, currentUser });
        router.push(`/match/${response.roomId}`);
      } else {
        toast.error('RoomID not available!');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Card className={css.plus} onClick={toggle} style={{ backgroundColor: 'blue' }}>
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
    </div>
  );
};

export default PlayWithRoomID;
