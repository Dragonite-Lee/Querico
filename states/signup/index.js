'use client'
import { atom } from "recoil";

const emailState = atom({
  key: "emailState",
  default: "",
});

const emailValidateState = atom({
  key: "emailValidateState",
  default: false,
});

const passwordState = atom({
    key: "passwordState",
    default: "",
});

const passwordValidateState = atom({
  key: "passwordValidateState",
  default: false,
});

const nameState = atom({
    key: "nameState",
    default: "",
});

const nameValidateState = atom({
  key: "nameValidateState",
  default: false,
});

export {emailState, emailValidateState, passwordState, passwordValidateState, nameState, nameValidateState};