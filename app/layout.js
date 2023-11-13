import './globals.css'
import Link from 'next/link'
import LoginBtn from './loginBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import InLogin from './inLogin'
import Image from 'next/image'
import { cookies } from 'next/dist/client/components/headers'
import style from '../style/layout.module.css'
import logo_pc from '../public/logo_pc.png'
import icon_write from '../public/icon_write.png'
import icon_mypage from '../public/icon_mypage.png'

export const metadata = {
  title: 'Mlog',
  description: '너의 이야기를 작성해줘',
}

export default async function RootLayout({ children }) {

  
  let userInfo = await getServerSession(authOptions) //서버 컴포넌트, 서버 기능안에서 사용가능
  
  // console.log(userInfo)
  return (
    <html lang="en">
    <body>
      <div className={style.navbar} > 
        <Link href="/" className={style.logo}>
          <Image src={logo_pc} alt="logo" className={style.logo_pc} />
        </Link> 
        <div className={style.nav_pc}>
          <Link href="/write" className={style.write}>글쓰기</Link>
          <Link href="/mypage" className={style.mypage}>마이페이지</Link>
        </div>
        <div className={style.nav_mo}>
          <Link href="/write">
            <Image src={icon_write} alt="icon_write" className={style.icon_write} />
          </Link>
          <Link href="/mypage">
            <Image src={icon_mypage} alt="icon_mypage" className={style.icon_mypage} />
          </Link>
        </div>
      </div> 
        {children}
      </body>
    </html>
  )
}
