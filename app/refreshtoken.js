'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const RefreshTokenHandler = ({ setSessionRefetchInterval }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const nowTime = Math.round(Date.now() / 1000);
      const timeRemaining = (session.token.expiresAt) - 7 * 60 - nowTime;
      setSessionRefetchInterval(timeRemaining > 0 ? timeRemaining : 0);
      console.log(session)
    }
  }, [session, setSessionRefetchInterval]);

  return null;
}

export default RefreshTokenHandler