import Link from 'next/link';

import style from '@/style/signUp.module.css'
import EmailBox from './emailBox';
import PasswordBox from './passwordBox';
import NameBox from './nameBox';
import SignUpBtn from './signupBtn';


function SignUp() {
  

  return (
    <section className={style.container}>
      <div className={style.content_container}>
        <div className={style.content_left}>
          <EmailBox />
          <PasswordBox />
        </div>
        <div className={style.content_right}>
          <NameBox />
        </div>
      </div>
      <SignUpBtn />
      <div className={style.option_container}>
        <Link href="/login" className={style.to_login}>로그인하러 가기</Link>
      </div>
    </section>
  );
}

export default SignUp;