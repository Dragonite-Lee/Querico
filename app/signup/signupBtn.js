'use client'
import style from '@/style/signUp.module.css'
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { emailState, passwordState, nameState } from '@/states/signup';

function SignUpBtn() {

    const emailValue = useRecoilValue(emailState);
    const passwordValue = useRecoilValue(passwordState);
    const nameValue = useRecoilValue(nameState);

    const [active, setActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let signupData = {};

    const signUpApi = async (data) => {
      console.log(data)
        setIsLoading(true)
        await axios.post('/api/register', data)
        .catch((err)=>alert('something went wrong'+ err))
        .finally(()=>setIsLoading(false))
    }

    useEffect(() => {
        if (emailValue != '' && passwordValue != '' && nameValue != '') {
            setActive(true)
        }
        signupData = {
            "email" : emailValue,
            "name" : nameValue,
            "password" : passwordValue
        }
    },[emailValue, passwordValue, nameValue])
    
    return (
      <button onClick={() => signUpApi(signupData)} className={active ? style.SignUpBtn_active : style.SignUpBtn_inactive}>
        가입하기
      </button>
    );
  }
  
  export default SignUpBtn;