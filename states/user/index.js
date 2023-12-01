'use client'
import { atom } from "recoil";

const userEmail = atom({
  key: "userEmailState",
  default: "",
});

const userName = atom({
    key: "userNameState",
    default: "",
});


export {userEmail, userName};