import {FilterSidebar} from '@/components/FilterSidebar/FilterSidebar';
import React from 'react';
import {CustomButton} from '../components/Button/Button';
import {useSession} from 'next-auth/react';
import {Header} from '@/components/ Header/Header';


export default function Home() {
  // const {data: session} = useSession();
  // console.log(session);
  return (
    <>
      {/* <CustomButton width="90%" isTransparent={false}>submit</CustomButton> */}
      <Header />
    </>
  );
}
