import React from 'react';
import { Card, Input } from 'reactstrap';
import styles from './chat.module.scss';
import ListMessage from '../listMessage';

const Chat = () => (
  <div className={styles.chatWrapper}>
    <Card className={styles.card}>
      <div className={styles.listMess}>
        <ListMessage />
      </div>
      <Input className={styles.inputChat} placeholder="send your mess..." />
    </Card>
  </div>
);

export default Chat;
