import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { newGame } from '../../../redux/currentMatch';

const EndGame = () => {
  const isEndGame = useSelector((state) => state.match.isEndGame);
  const dispatch = useDispatch();
  const onNewGame = () => {
    const action = newGame();
    dispatch(action);
  };
  return (
    <div>
      <Modal isOpen={isEndGame}>
        <ModalHeader>MÀY THUA RỒI!</ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={onNewGame}>New Game</Button>
          <Button color="secondary">Exit</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EndGame;