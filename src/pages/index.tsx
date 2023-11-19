import HeaderLayout from '@/components/layouts/HeaderLayout/HeaderLayout';
import {SidebarLayout} from '@/components/layouts/SidebarLayout/SidebarLayout';
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
