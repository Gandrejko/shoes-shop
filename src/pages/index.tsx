import Header from '@/components/Header';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import {signOut, useSession} from 'next-auth/react';
import {destroyCookie} from 'nookies';
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

  //Put log out function here for example
  const logoutFunction = async () => {
    destroyCookie(null, 'rememberMe');
    await signOut();
  };
  return (
    <>
      <div onClick={logoutFunction}>Log out</div>
    </>
  );
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
