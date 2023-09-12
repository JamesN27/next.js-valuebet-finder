import { cache } from 'react';
import { Session } from '../migrations/00001-createSessions';
import { sql } from './connect';

export const deleteExpiredSessions = cache(async () => {
  await sql`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < now()
  `;
});

export const createSession = cache(async (token: string, userId: number) => {
  const [session] = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      id,
      token,
      user_id
  `;

  // delete all sessions that are expired
  await deleteExpiredSessions();

  return session;
});

export const deleteSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
    DELETE FROM
    sessions
    WHERE
     sessions.token = ${token}
    RETURNING
      id,
      token

  `;

  return session;
});
