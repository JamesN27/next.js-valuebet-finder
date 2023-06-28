import { cache } from 'react';
import { sql } from './connect';

type UserWithPasswordHash = {
  id: number;
  username: string;
  passwordHash: string;
};

export type User = {
  id: number;
  username: string;
};

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<UserWithPasswordHash[]>`
  SELECT * FROM
    users WHERE users.username = ${username}`;
  return user;
});

export const createUser = cache(
  async (username: string, passwordHash: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
  INSERT INTO
    users (username, password_hash)
    VALUES
    (${username}, ${passwordHash})
    RETURNING *`;
    return user;
  },
);
