import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Messages from './Messages';
import styles from '../styles/Chat.module.css';

const socket = io.connect('http://localhost:5000');

const Chat = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [state, setState] = useState([]);
  const [params, setParams] = useState({ room: '', user: '' });
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState(0);

  const handleLeave = () => {
    socket.emit('leaveRoom', { params });
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;

    socket.emit('sendMessage', { message, params });
    setMessage('');
  };

  const handleChange = ({ target: { value } }) => {
    setMessage(value);
  };

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    console.log(searchParams);

    socket.emit('join', searchParams);
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setState((_state) => [..._state, data]);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    socket.on('joinRoom', ({ data: { users } }) => {
      console.log(users);

      setUsers(users.length);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.room}>{params.room}</div>
        <div className={styles.userCount}>{users} users in this room</div>
        <button onClick={handleLeave} className={styles.leaveButton}>
          Leave Room
        </button>
      </div>

      <Messages messages={state} name={params.name} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          placeholder="Send message"
          value={message}
          onChange={handleChange}
          autoComplete="off"
          required
          className={styles.input}
        />
        <input type="submit" value="Send" className={styles.sendButton} />
      </form>
    </div>
  );
};

export default Chat;
