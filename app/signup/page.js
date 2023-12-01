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
    </section>
  );
}

export default SignUp;