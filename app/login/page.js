import Image from 'next/image'
import Link from 'next/link'

import style from '../../style/login.module.css'

import NaverLogin from '../authlogin/naver'
import bg_login from '../../public/login/bg-login.png'


export default function Login(){
    return (
    <div className={style.login_container}>
        <div
          style={{
            backgroundImage: `url(${bg_login.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "1280px",
            height: "720px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <form action="/api/login" method="POST" className={style.input_container}>
            <input type="text" name="email" placeholder="이메일을 입력해 주세요" className={style.input_box}/>
            <input type="password" name="password" placeholder="비밀번호를 입력해 주세요" className={style.input_box}/>
            <button type="submit" className={style.submit_box}>로그인</button>
          </form>
          <div className={style.option_container}>
            <Link href="/signup" className={style.sign_up}>새로 오셨나요?</Link>
          </div>
          <div className={style.social_container}>
            <NaverLogin />
          </div>
        </div>
      </div>
    )
  }