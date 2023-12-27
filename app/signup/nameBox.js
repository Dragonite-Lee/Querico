'use client'
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { nameState, nameValidateState } from '@/states/signup';
import style from '@/style/signUp.module.css'


function NameBox() {

    const nameHandler = useSetRecoilState(nameState);
    const nameValidateHandler = useSetRecoilState(nameValidateState)

    let [nameValid, setNameValid] = useState(false);
    let [nameValue, setNameValue] = useState('');

    const nameValidate = (event) => {
        const {currentTarget : {value}} = event;
        setNameValue(value);
        nameHandler(value);
        if (value.length < 9 && value.length > 0) {
            setNameValid(true);
            nameValidateHandler(true);
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
                    onChange={(e) => {nameValidate(e)}}
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