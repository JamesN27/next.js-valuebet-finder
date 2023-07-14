'use client';

import { useRouter } from 'next/navigation';
import { logout } from './(auth)/logout/actions';
import style from './LogoutButton.module.css';

export function LogoutButton() {
  const router = useRouter();
  return (
    <form>
      <button
        className={style.logoutButton}
        formAction={async () => {
          await logout();
          router.refresh();
        }}
      >
        Logout
      </button>
    </form>
  );
}
