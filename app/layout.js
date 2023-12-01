import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/dist/client/components/headers'

import style from '../style/layout.module.css'
import AuthSession from './AuthSession'
import RecoilProvider from './RecoilRoot'


export const metadata = {
  title: 'Querico',
  description: '쉽고 맛있는 요리를 하자.',
  icons: {
    icon: "/favicon.ico"
  },
}

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <AuthSession>
          <RecoilProvider>
            {children}
          </RecoilProvider>
        </AuthSession>
      </body>
    </html>
  )
}
