import React, { useState } from 'react';
import { Modal, Button, ModalBody, Card } from 'reactstrap';
import css from '../../pages/home/css.module.scss';
import Searching from '../Searching';

const QuickPlay = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const closeModal = () => setModal(false);

  return (
    <div>
      <Card className={css.plus} onClick={toggle} style={{ backgroundColor: 'yellow' }}>
        <img src="/search.svg" alt="lock" />
        <div>Quick play</div>
      </Card>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Searching />
          <Button style={{ width: '100%' }} onClick={closeModal}>Cancel</Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default QuickPlay;
