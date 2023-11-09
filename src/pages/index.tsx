import Header from '@/components/Header';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import {useSession} from 'next-auth/react';
import {ReactElement, useEffect} from 'react';
import {toast} from 'react-toastify';

const Home = () => {
  const {data: session} = useSession();

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem('signInJustNow') || '{}');

    if (typeof value !== 'object' && value) {
      toast.success(`Hello, ${session?.user.username}!`);
      localStorage.setItem('signInJustNow', JSON.stringify(false));
    }
  }, []);

  return <></>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      <SidebarLayout currentTab="products">{page}</SidebarLayout>
    </>
  );
};

export default Home;
