import Image from 'next/image'

import style from '../../style/mainboardLayout.module.css'
import logo_pc from '../../public/login/logo_pc.png'

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
          <div className={style.top_container}>
            <Image src={logo_pc} alt="Querico로고" className={style.logo_img} />
          </div>
            {children}
      </body>
    </html>
  )
}
