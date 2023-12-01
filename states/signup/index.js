'use client'
import { atom } from "recoil";

const emailState = atom({
  key: "emailState",
  default: "",
});

const passwordState = atom({
    key: "passwordState",
    default: "",
});

  const nameState = atom({
    key: "nameState",
    default: "",
});

export {emailState, passwordState, nameState};