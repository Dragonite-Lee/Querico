'use client'
import { atom } from "recoil";

export const pageNameState = atom({
  key: "pageNameState",
  default: "fsf",
});