import React, { useEffect, useState } from 'react';
import { Modal, Button, ModalBody, Card } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import css from '../../pages/home/css.module.scss';
import Searching from '../Searching';
import { selectUser } from '../../redux/userSlice';

let startScan = false;

const QuickPlay = ({ socket, createNewRoom }) => {
  const [currentUser] = useState(useSelector(selectUser));
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const toggle = () => setModal(!modal);
  const closeModal = () => {
    setModal(false);
    startScan = false;
  };
  const quickPlay = () => {
    startScan = true;
    setModal(!modal);
    socket.emit('quick-play', currentUser);
  };

  useEffect(() => {
    socket.on(`server-response-no-room-${currentUser.access_token}`, () => {
      const timeOut = setTimeout(() => {
        clearTimeout(timeOut);
        createNewRoom();
        closeModal();
      }, 2000);
    });

    socket.on(`server-response-find-fail-${currentUser.access_token}`, () => {
      const timeOut = setTimeout(() => {
        clearTimeout(timeOut);
        if (startScan) {
          socket.emit('quick-play', currentUser);
        }
      }, 5000);
    });

    socket.on(`server-response-room-join-${currentUser.access_token}`, (response) => {
      // Join game here
      const timeOut = setTimeout(() => {
        clearTimeout(timeOut);
        socket.emit('joined', { roomId: response, currentUser });
        router.push(`/match/${response}`);
        closeModal();
      }, 2000);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card className={css.plus} onClick={quickPlay}>
        <img src="/search.svg" alt="lock" />
        <div>Quick play</div>
      </Card>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Searching />
          <Button style={{ width: '100%' }} onClick={closeModal}>Cancel</Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default React.memo(QuickPlay);
