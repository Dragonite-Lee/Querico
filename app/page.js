import Image from 'next/image'

import { connectDB } from '@/util/database'
import LoginBtn from './loginBtn';

export default async function Home() {

  const client = await connectDB;
  const db = client.db("querico")
  
  return (
    <div>
      안녕
      <LoginBtn />
    </div>
  )
}
