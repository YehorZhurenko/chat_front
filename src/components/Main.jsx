import React, { useState } from 'react';
import styles from '../styles/Main.module.css';
import { Link } from 'react-router-dom';

const FIELDS = { NAME: 'name', ROOM: 'room' };

const Main = () => {
  const { NAME, ROOM } = FIELDS;
  const [values, setValues] = useState({ [NAME]: '', [ROOM]: '' });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((value) => !value);
    if (isDisabled) e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Join</h1>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Username"
              onChange={handleChange}
              autoComplete="off"
              required
              value={values[NAME]}
              className={styles.input}
            />
            <input
              type="text"
              name="room"
              placeholder="Room"
              onChange={handleChange}
              autoComplete="off"
              required
              value={values[ROOM]}
              className={styles.input}
            />
          </div>
          <Link to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}>
            <button type="submit" onClick={handleClick} className={styles.button}>
              Submit
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Main;
