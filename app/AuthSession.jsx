'use client';
import RefreshTokenHandler from "@/app/refreshtoken";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export default function AuthSession({ children }) {
  const [sessionRefetchInterval, setSessionRefetchInterval] = useState(10000);

  return (
    <SessionProvider refetchInterval={sessionRefetchInterval}>
      {children}
      <RefreshTokenHandler
        setSessionRefetchInterval={setSessionRefetchInterval}
      />
    </SessionProvider>
  )
}