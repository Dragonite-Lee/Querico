'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import style from '../../../../style/userInfo.module.css'
import user_logo from '@/public/user/user.png'

function UserInfo() {
  
  const { data: session, status } = useSession();

  const [toggle, setToggle] = useState(false);
  
  if (status === 'authenticated') {
    console.log(session)
    return (
      <div className={style.login_container}>
        <Image src={user_logo} alt="user로고" className={style.user_logo_img} />
        <div>{session.user.name} 님</div>
        {toggle && (
          <div>
            
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={style.not_login_container}>
     <Link href="/login" className={style.to_login}>로그인하기</Link>
    </div>
  );
}

export default UserInfo;