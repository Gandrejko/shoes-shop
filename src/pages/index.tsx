import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import {useSession} from 'next-auth/react';
import {ReactElement, useEffect} from 'react';
import {toast} from 'react-toastify';

const Home = () => {
  const {data: session, status} = useSession();

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem('signInJustNow') || '{}');

    if (typeof value !== 'object' && value && session) {
      toast.success(`Hello, ${session?.user.username}!`);
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
  return <></>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <HeaderLayout>
      <SidebarLayout currentTab="products">{page}</SidebarLayout>
    </HeaderLayout>
  );
};

export default Home;
