import bcrypt from 'bcrypt'
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from "next-auth/providers/naver";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { connectDB } from "@/util/database";
import prisma from "@/lib/prismadb";


export const authOptions = {
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
        credentials: {
          email: { label: "email", type: "text", placeholder: "이메일을 입력해 주세요." },
          password: { label: "password", type: "password", placeholder: "비밀번호를 입력해 주세요." },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고 
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid Credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid Credentials');
        }

        const pwCheck = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!pwCheck) {
          throw new Error('Invalid Credentials');
        }

        return user;
      }
    })
  ],

  callbacks: {
    //4. jwt 만들 때 실행되는 코드 
    //jwt에 토큰들과 만료기간,user를 담아 보냄
    async jwt({ token, account, profile }) {
      if (profile && account) {
        token.email = profile.response.email;
        token.name = profile.response.name;
        token.provider = account.provider;
        token.accessToken = account.access_token;
        token.accessTokenExpires = account.expires_at;
        token.refreshToken = account.refresh_token;
      }
    
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    //jwt토큰정보를 session에 유지시키게 됨
    async session({ session, token }) {
      if (session) {
        session.email = token.email;
        session.name = token.name;
        session.provider = token.provider;
        session.accessToken = token.accessToken;
        session.accessTokenExpires = token.accessTokenExpires;
        session.error = token.error;
      }
      return session;
    },
  },
  
  secret : process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 1 * 2 * 60 * 60 //2시간
  },
  pages: {
    signIn: "/login",
  },
  adapter : PrismaAdapter(prisma),
  debug: process.env.NODE_ENV == 'development',

};
export default NextAuth(authOptions); 

