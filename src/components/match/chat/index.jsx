import React from 'react';
import { Card, Input } from 'reactstrap';
import styles from './chat.module.scss';
import Message from '../Message';

const Chat = () => (
  <div className={styles.chatWrapper}>
    <Card className={styles.card}>
      <div className={styles.listMess}>
        <Message />
        <Message />
      </div>
      <Input className={styles.inputChat} placeholder="send your mess..." />
    </Card>
  </div>
);

export default Chat;
