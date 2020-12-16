import React, { useState, useEffect } from 'react';
import { Card, Input } from 'reactstrap';
import { useSelector } from 'react-redux';
import styles from './chat.module.scss';
import Message from '../Message';
import { selectUser } from '../../../redux/userSlice';

const Chat = (props) => {
  const { socket, roomId } = props;

  const [currentUser] = useState(useSelector(selectUser));

  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        // Send message to server
        socket.emit('client-message', { roomId, message: e.target.value, username: currentUser.user.email });
        // Blank input form
        e.target.value = '';
      }
    }
  };

  useEffect(() => {
    socket.on(`server-response-message-${roomId}`, (response) => {
      setMessages((oldMessages) => [...oldMessages, { response }]);
    });
  }, []);

  return (
    <div className={styles.chatWrapper}>
      <Card className={styles.card}>
        <div className={styles.listMess}>
          {/* eslint-disable-next-line react/no-array-index-key */}
          {messages.map((value, index) => <Message key={index} message={value} />)}
          {/* <Message socket={socket} roomId={roomId} /> */}
          {/* <Message socket={socket} roomId={roomId} /> */}
        </div>
        <Input className={styles.inputChat} placeholder="send your mess..." onKeyPress={handleChange} />
      </Card>
    </div>
  );
};

export default Chat;
