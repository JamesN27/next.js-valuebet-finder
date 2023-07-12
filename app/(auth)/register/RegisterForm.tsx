'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function register() {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
    }

    if ('user' in data) {
      console.log(data.user);
      router.push(`/profile/${data.user.username}`);
      router.refresh();
    }
  }

  return (
    <form
      className={styles.register}
      onSubmit={(event) => event.preventDefault()}
    >
      <label className={styles.label}>
        Username:{' '}
        <input
          className={styles.form__field}
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label className={styles.label}>
        Password:{' '}
        <input
          className={styles.form__field}
          value={password}
          type="password"
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <button className={styles.button} onClick={async () => await register()}>
        {' '}
        Sign up{' '}
      </button>
      {error !== '' && <div className={styles.error}>{error}</div>}
    </form>
  );
}
