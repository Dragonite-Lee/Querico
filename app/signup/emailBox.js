'use client'
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { emailState } from '@/states/signup';
import style from '@/style/signUp.module.css'
import { emailReg } from '../../util/reg'
import axios from 'axios';

function EmailBox() {

    const emailHandler = useSetRecoilState(emailState);

    let [emailValid, setEmailValid] = useState(false);
    let [emailRepeat, setEmailRepeat] = useState(false);
    let [emailValue, setEmailValue] = useState('');

    const emailValidate = (event) => {
        const {target : {value}} = event;
        setEmailValue(value);
        if (emailReg.test(value)) {
          setEmailValid(true);
          emailHandler(emailValue);
        } else {
          setEmailValid(false);
        }
    }
    
    /*onClick 이용해서 서버로 체크하게 됨 */
    // const emailRepeatCheck = async (emailData) => {
        
        // const data = await axios.get('/api/repeat', emailData)
        // console.log(data)
    // }

    return (
        <div className={style.email_box}>
            <div className={style.email_text}>
                이메일을 입력해 주세요
            </div>
            <div>
            <div className={style.email_input_box}>
                <input type="text" placeholder='이메일을 입력해 주세요' className={style.email_input}
                    onInput={(e) => {emailValidate(e)}}
                />
                <button className={style.email_repeat_check} onClick={()=>emailRepeatCheck(emailValue)}>
                    중복확인
                </button>
            </div>
            {
                emailValue.length > 0 && emailValid === false && (
                <div className={style.alert_red}>
                    유효하지 않은 이메일 입니다
                </div>
                )
            }
            {/* onChange로 focus가 떠나면 이미 가입된 이메일인지 사용가능인지 판별 하는 문구 필요 */}
            {/* <div className={style.alert_blue}>
                이미 가입된 이메일 입니다
            </div> */}
            </div>
        </div>
    )
}

export default EmailBox;