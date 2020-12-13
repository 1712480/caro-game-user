import React from 'react';
import styles from './message.module.scss';

const Message = () => (
  <div className={styles.messageWrapper}>
    <img alt="user chat" src="https://lh4.googleusercontent.com/-yxknS0IUw_k/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclVhFJEJ97aiwmHuluCBolejitwAw/s96-c-rg-br100/photo.jpg" />
    <div className={styles.mess}>chào cậu!</div>
  </div>
);

export default Message;
