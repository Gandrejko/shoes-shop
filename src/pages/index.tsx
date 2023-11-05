import React from 'react';
import Link from 'next/link'
import {CustomButton} from '../components/Button/Button';

export default function Home() {
  return (
    <>
      {/* <CustomButton width="90%" isTransparent={false}>submit</CustomButton> */}
      <Link href="/error/page404">404</Link>
      <Link href="/error/page500">500</Link>
    </>
  );
}
