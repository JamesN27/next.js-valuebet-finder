'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import styles from './LoginForm.module.css';

type Props = { returnTo?: string };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function login() {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      console.log(data.error);
      return;
    }

    if ('user' in data) {
      const returnTo = getSafeReturnToPath(props.returnTo);
      if (returnTo) {
        router.push(returnTo);
        return;
      }
      console.log(data.user);
      router.push(`/profile/${data.user.username}`);
      router.refresh();
    }
  }

  return (
    <form className={styles.login} onSubmit={(event) => event.preventDefault()}>
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
      <button className={styles.button} onClick={async () => await login()}>
        Login
      </button>
      {error !== '' && <div className={styles.error}>{error}</div>}
    </form>
  );
}
