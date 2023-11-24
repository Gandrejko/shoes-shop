import {useSession} from 'next-auth/react';
import {ReactNode, useEffect} from 'react';
import {toast} from 'react-toastify';

type SignInProps = {
  children: ReactNode;
};

export const SignInLayout = ({children}: SignInProps) => {
  const {data: session, status} = useSession();

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem('signInJustNow') || '{}');

    if (typeof value !== 'object' && value && session) {
      const userFullName =
        (session?.user.firstName + ' ' + session?.user.lastName).trim() ||
        session?.user.username;
      toast.success(`Hello, ${userFullName}!`);
      localStorage.setItem('signInJustNow', JSON.stringify(false));
    }
  }, [session?.user.username]);

  useEffect(() => {
    if (status === 'authenticated') {
      const value = localStorage.getItem('accessToken');

      if (!value) {
        localStorage.setItem(
          'accessToken',
          JSON.stringify(session?.user.accessToken),
        );
      }
    }
  }, [session?.user.accessToken, status]);
  return <>{children}</>;
};
