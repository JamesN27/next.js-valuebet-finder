import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createUser,
  getUserByUsername,
  User,
} from '../../../../database/users';

type Error = { error: string };

export type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | Error;

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  const body = await request.json();

  console.log(body);
  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'username or password missing' },
      { status: 400 },
    );
  }

  console.log('query', await getUserByUsername(result.data.username));

  if (await getUserByUsername(result.data.username)) {
    return NextResponse.json(
      { error: 'username is already used' },
      { status: 406 },
    );
  }

  console.log(await createUser(result.data.username, result.data.password));

  return NextResponse.json({ user: { id: 1, username: 'jose' } });
}
