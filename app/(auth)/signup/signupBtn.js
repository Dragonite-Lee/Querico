'use client'
import style from '@/style/signUp.module.css'
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { emailState, passwordState, nameState, passwordValidateState, emailValidateState, nameValidateState } from '@/states/signup';

function SignUpBtn() {

    const [emailValue, setEmailValue] = useRecoilState(emailState);
    const [passwordValue, setPasswordValue] = useRecoilState(passwordState);
    const [nameValue, setNameVaue] = useRecoilState(nameState);
    const [emailValidate, setEmailValidate] = useRecoilState(emailValidateState);
    const [passwordValidate, setPasswordValidate] = useRecoilState(passwordValidateState);
    const [nameValidate, setNameValidate] = useRecoilState(nameValidateState);

    const [active, setActive] = useState(false);
    let signupData = {};
    const router = useRouter();

    const signUpApi = async (data) => {
      
        await axios.post('/api/register', data)
          .then(() => {
            router.push('/login');
            setEmailValue('');
            setPasswordValue('');
            setNameVaue('');
            setEmailValidate(false);
            setPasswordValidate(false);
            setNameValidate(false)
          })
          .catch((error) => {
            console.log("Something went wrong" + error)
          })
    }

    useEffect(() => {
        if (emailValidate === true && passwordValidate === true && nameValidate === true) {
            setActive(true)
        } else {
          setActive(false)
        }
        // console.log(emailValidate)
        signupData = {
            "email" : emailValue,
            "name" : nameValue,
            "password" : passwordValue
        }
    },[emailValue, emailValidate, passwordValue, passwordValidate, nameValue, nameValidate])
    
    return (
      <button onClick={() => signUpApi(signupData)} className={active ? style.SignUpBtn_active : style.SignUpBtn_inactive}>
        가입하기
      </button>
    );
  }
  
  export default SignUpBtn;