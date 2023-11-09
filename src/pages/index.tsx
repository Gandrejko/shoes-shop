import {useSession} from 'next-auth/react';
import {useEffect} from 'react';

export default function Home() {
  const {data: session, status} = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      const value = localStorage.getItem('accessToken');

      if (value === null || value === undefined) {
        localStorage.setItem(
          'accessToken',
          JSON.stringify(session?.user.accessToken),
        );
      }
    }
  }, [session?.user.accessToken, status]);
  return <></>;
}
