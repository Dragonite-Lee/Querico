'use client'
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { nameState } from '@/states/signup';
import style from '@/style/signUp.module.css'


function NameBox() {

    const nameHandler = useSetRecoilState(nameState);

    let [nameValid, setNameValid] = useState(false);
    let [nameValue, setNameValue] = useState('');

    const nameValidate = (event) => {
        const {target : {value}} = event;
        setNameValue(value);
        if (value.length < 9 && value.length > 0) {
            setNameValid(true);
            nameHandler(nameValue);
        } else {
            setNameValid(false);
        }
    }

    return (
        <div className={style.name_box}>
            <div className={style.name_text}>
                사용하실 닉네임을 입력해주세요
            </div>
            <div>
                <input type="text" placeholder='닉네임을 입력해 주세요' className={style.name_input}
                    onInput={(e) => {nameValidate(e)}}
                />
                {
                    nameValid === true 
                    ?(
                    <div className={style.alert_blue}>
                        사용 가능한 닉네임 입니다
                    </div>
                    ) 
                    :(
                    <div className={style.alert_red}>
                        1 - 8자리를 사용해 주세요
                    </div>
                    )
                }
            </div>
            
        </div>
    )
}

export default NameBox;