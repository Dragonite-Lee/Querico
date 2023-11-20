import './globals.css'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Image from 'next/image'
import { cookies } from 'next/dist/client/components/headers'
import style from '../style/layout.module.css'
import AuthSession from './AuthSession'


export const metadata = {
  title: 'Querico',
  description: '쉽고 맛있는 요리를 하자.',
}

export default async function RootLayout({ children }) {

  
  let userInfo = await getServerSession(authOptions) //서버 컴포넌트, 서버 기능안에서 사용가능
  
  console.log(userInfo)
  return (
    <html lang="en">
      <body>
        <AuthSession>
          {children}
        </AuthSession>
      </body>
    </html>
  )
}
