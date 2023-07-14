import LoginForm from './LoginForm';

type Props = {
  searchParams: {
    returnTo?: string | string[];
  };
};

export default function LoginPage({ searchParams }: Props) {
  const returnTo = Array.isArray(searchParams.returnTo)
    ? searchParams.returnTo[0] // Take the first element from the array
    : searchParams.returnTo;

  return <LoginForm returnTo={returnTo} />;
}
