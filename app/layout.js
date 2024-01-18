import './globals.css'
import { cookies } from 'next/dist/client/components/headers'
import { Toaster } from "react-hot-toast";

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
            <Toaster position="top-center" />
            {children}
          </RecoilProvider>
        </AuthSession>
      </body>
    </html>
  )
}
