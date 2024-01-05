"use client";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";

import { emailState, emailValidateState } from "@/states/signup";
import style from "@/style/signUp.module.css";
import { emailReg } from "../../../util/reg";

function EmailBox() {
  const emailHandler = useSetRecoilState(emailState);
  const emailValidateHandler = useSetRecoilState(emailValidateState);

  let [emailValid, setEmailValid] = useState(false);
  let [emailRepeat, setEmailRepeat] = useState(false);
  let [emailRepeatTest, setEmailRepeatTest] = useState("");
  let [emailRepeatClick, setEmailRepeatClick] = useState(false);
  let [emailValue, setEmailValue] = useState("");

  const emailValidate = (event) => {
    const {
      currentTarget: { value },
    } = event;
    setEmailValue(value);
    emailHandler(value);
    setEmailRepeatClick(false);
    emailValidateHandler(false);
    if (emailReg.test(value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  /*onClick 이용해서 서버로 체크하게 됨 */
  const emailRepeatCheck = async (data) => {
    setEmailRepeatClick(true);
    let repeatData = {
      email: data,
    };
    await axios
      .post("/api/repeat", repeatData)
      .then((res) => {
        setEmailRepeat(res.data.status);
        setEmailRepeatTest(res.data.message);
        if (res.status == 200) {
          emailValidateHandler(true);
          
        }
      })
      .catch((error) => {
        console.log("Something went wrong" + error);
      });
  };

  return (
    <div className={style.email_box}>
      <div className={style.email_text}>이메일을 입력해 주세요</div>
      <div>
        <div className={style.email_input_box}>
          <input
            type="text"
            placeholder="이메일을 입력해 주세요"
            className={style.email_input}
            onChange={(e) => {
              emailValidate(e);
            }}
          />
          <button
            className={style.email_repeat_check}
            onClick={() => emailRepeatCheck(emailValue)}
          >
            중복확인
          </button>
        </div>
        {emailValue.length > 0 && emailValid === false && (
          <div className={style.alert_red}>유효하지 않은 이메일 입니다</div>
        )}
        {emailRepeatClick === true &&
          (emailRepeat === true ? (
            <div className={style.alert_red}>{emailRepeatTest}</div>
          ) : (
            <div className={style.alert_blue}>사용 가능한 이메일 입니다</div>
          ))}
      </div>
    </div>
  );
}

export default EmailBox;
