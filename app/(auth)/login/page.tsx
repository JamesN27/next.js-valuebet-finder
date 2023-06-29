import LoginForm from './LoginForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default function LoginPage({ searchParams }: Props) {
  return <LoginForm returnTo={searchParams.returnTo} />;
}
