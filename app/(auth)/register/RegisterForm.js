'use client';

import { useState } from 'react';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <button
        onClick={async () => {
          await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
          });
        }}
      >
        {' '}
        sign up{' '}
      </button>
    </form>
  );
}
