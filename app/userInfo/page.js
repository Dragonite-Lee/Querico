'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link';

import style from '../../style/userInfo.module.css'

function UserInfo() {
  
    const { data: session, status } = useSession();
    console.log(session)
    if (status === 'authenticated') {
        return (
            <div>
                <button onClick={()=>signOut()}>로그아웃</button>
                <div>{session.user.email}</div>
                
            </div>
        )
    }
  return (
    <div className={style.container}>
     
     <Link href="/login" className={style.login}>로그인하기</Link>
        
    </div>
  );
}

export default UserInfo;