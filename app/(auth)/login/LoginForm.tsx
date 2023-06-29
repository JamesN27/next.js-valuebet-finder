'use client';

import { useState } from 'react';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function login() {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      console.log(data.error);
    }

    if ('user' in data) {
      console.log(data.user);
    }
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        username:{' '}
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        password:{' '}
        <input
          value={password}
          type="password"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button onClick={async () => await login()}>Login </button>
      {error !== '' && <div className={styles.error}>{error}</div>}
    </form>
  );
}
