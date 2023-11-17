import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import {SidebarLayout} from '@/components/SidebarLayout/SidebarLayout';
import {ReactElement} from 'react';

const Home = () => {
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
