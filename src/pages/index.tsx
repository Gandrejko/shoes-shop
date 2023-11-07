import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link'

export default function Home() {
  // const {data: session} = useSession();
  // console.log(session);
  return (
    <>
      {/* <CustomButton width="90%" isTransparent={false}>submit</CustomButton> */}
      {/*<Header />*/}
      <Link href="/404">404</Link>
      <Link href="/500">500</Link>
    </>
  )
}
