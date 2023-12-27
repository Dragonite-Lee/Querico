"use client";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

import { passwordState, passwordValidateState } from "@/states/signup";
import style from "@/style/signUp.module.css";
import { pwReg } from "../../../util/reg";

function PasswordBox() {
  const passwordHandler = useSetRecoilState(passwordState);
  const passwordValidateHandler = useSetRecoilState(passwordValidateState);

  let [pwValid, setPwValid] = useState(false);
  let [pwValue, setPwValue] = useState("");
  let [pwCheck, setPwCheck] = useState(false);

  const passwordValidate = (event) => {
    const {
      currentTarget: { value },
    } = event;
    setPwValue(value);
    setPwCheck(false);
    if (pwReg.test(value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const passwordCheck = (event) => {
    const {
      currentTarget: { value },
    } = event;
    if (pwValue === value) {
      setPwCheck(true);
      passwordValidateHandler(true);
      passwordHandler(pwValue);
    } else {
      setPwCheck(false);
    }
  };

  return (
    <div className={style.pw_box}>
      <div className={style.pw_text}>비밀번호를 입력해 주세요</div>
      <div>
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          onChange={(e) => passwordValidate(e)}
          className={style.pw_input}
        />
        {pwValid === true ? (
          <div className={style.alert_blue}>사용 가능한 비밀번호 입니다</div>
        ) : (
          <div className={style.alert_red}>
            영문, 숫자, 특수문자 포함 10-16자리를 사용해 주세요
          </div>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="비밀번호를 재입력해 주세요"
          onChange={(e) => passwordCheck(e)}
          className={style.pw_input}
        />
        {pwValue.length > 1 &&
          (pwCheck === true ? (
            <div className={style.alert_blue}>비밀번호가 일치합니다</div>
          ) : (
            <div className={style.alert_red}>비밀번호가 일치하지 않습니다</div>
          ))}
      </div>
    </div>
  );
}

export default PasswordBox;
