import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';
import style from './page.module.css';

type Props = {
  params: { username: string };
};

export default async function ProfileUsernamePage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const formattedUsername =
    user.username.charAt(0).toUpperCase() + user.username.slice(1);

  return (
    <div className={style.welcomeContainer}>
      <div className={style.welcomeMessage}>
        Welcome to the Value Wizard {formattedUsername} !
      </div>
    </div>
  );
}
