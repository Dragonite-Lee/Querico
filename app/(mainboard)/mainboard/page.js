// import { connectDB } from '@/util/database'

import UserInfo from "../../(auth)/userInfo/page";

export default async function Home() {
  return (
    <div>
      안녕
      <UserInfo />
    </div>
  );
}
