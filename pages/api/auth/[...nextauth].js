import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from 'next-auth/providers/kakao'
import bcrypt from 'bcrypt'


export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    // CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드 
      // name: "credentials",
      //   credentials: {
      //     email: { label: "email", type: "text", placeholder: "이메일을 입력해 주세요." },
      //     password: { label: "password", type: "password", placeholder: "비밀번호를 입력해 주세요." },
      // },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고 
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      // async authorize(credentials) {
      //   let db = (await connectDB).db('querico');
      //   let user = await db.collection('user').findOne({email : credentials.email})
      //   if (!user) {
      //     console.log('이메일이 존재하지 않습니다.');
      //     return null
      //   }
      //   const pwcheck = await bcrypt.compare(credentials.password, user.password);
      //   if (!pwcheck) {
      //     console.log('비밀번호가 일치하지 않습니다.');
      //     return null
      //   }
      //   return user
      // }
    // })
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: 'jwt',
    maxAge: 1 * 2 * 60 * 60 //2시간
  },
  pages: {
    signIn: "/login",
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드 
    //jwt에 토큰들과 만료기간,user를 담아 보냄
    async jwt({ token, account, user }) {
      if (account && user) {
        // return {
        //   accessToken: account.access_token,
        //   accessTokenExpires: account.expires_at,
        //   refreshToken: account.refresh_token,
        //   user: user,
        // }
        token.user = {}
        token.user.id = user.id;
        token.user.name = user.name;
        token.user.email = user.email;
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    //jwt토큰정보를 session에 유지시키게 됨
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
      return session;
    },
  },
  
  jwt: {
    secret : process.env.NEXTAUTH_SECRET,
  },
  adapter : MongoDBAdapter(connectDB),
  

};
export default NextAuth(authOptions); 