import React from 'react';
import styles from '../styles/Messages.module.css';

const Messages = ({ messages, name }) => {
  return (
    <div className={styles.messages}>
      {messages.map(({ user, message }, i) => {
        const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();

        return (
          <div key={i} className={itsMe ? styles.myMessage : styles.otherMessage}>
            <span className={styles.username}>{user.name}</span>
            <div className={styles.message}>{message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
