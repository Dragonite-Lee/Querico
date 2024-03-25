'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import style from '../../../../style/userInfo.module.css';
import user_logo from '@/public/user/user.png';

const menuRoutes = [
  {
    label: "작성중인 레시피",
    href: "/unpublish",
  },
  {
    label: "내가 쓴 글",
    href: "/publish",
  }
];

function UserInfo() {
  
  const { data: session, status } = useSession();
  const router = useRouter();

  const [toggle, setToggle] = useState(false);

  if (session?.token.refreshToken == "") {
    router.push("/login");
  }
  
  if (status === 'authenticated') {
    console.log(session)
    return (
      <>
        <div className={style.login_container}>
          <Image src={user_logo} alt="user로고" className={style.user_logo_img} />
          <div>{session.user.name} 님</div>
        </div>
        <div>
          <div>
            <button onClick={signOut}>로그아웃</button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={style.not_login_container}>
     <Link href="/login" className={style.to_login}>로그인하기</Link>
    </div>
  );
}

export default UserInfo;