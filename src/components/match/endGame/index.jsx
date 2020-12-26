import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { restartGame } from '../../../redux/currentMatch';

const EndGame = (props) => {
  const { socket, roomId } = props;
  const isEndGame = useSelector((state) => state.match.isEndGame);
  const myTurn = useSelector((state) => state.match.isTurnX);
  const dispatch = useDispatch();
  const router = useRouter();

  const onNewGame = () => {
    socket.emit('new-game', roomId);
    const action = restartGame(myTurn);
    dispatch(action);
  };

  socket.on(`exit-room-${roomId}`, () => {
    router.push('/home');
  });

  const onExit = () => {
    socket.emit('exit-room', roomId);
    router.push('/home');
  };
  return (
    <div>
      <Modal isOpen={isEndGame}>
        <ModalHeader>{myTurn ? 'You lose!' : 'You win!'}</ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={onNewGame}>New Game</Button>
          <Button color="secondary" onClick={onExit}>Exit</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EndGame;
