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
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid Credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
 
        if (!user) {
          alert("존재하지 않는 이메일입니다.");
          return null;
        }
        if (!user.hashedPassword) {
          alert("소셜 로그인으로 가입된 이메일입니다.");
          return null;
        }
        

        const pwCheck = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!pwCheck) {
          alert("비밀번호가 불일치 합니다.");
          return null;
        }

        const account = await prisma.account.findUnique({
          where: {
            userId: user.id
          }
        })
        
        if (!account) {
          const jwt = requ
          const newAccount = await prisma.account.create({
            data: {
              userId: user.id,
              type: "credentials",
              provider: "credentials",
              providerAccountId: String(new Date().getTime() + Math.floor(Math.random() + 1)),
            }
          });
        } 

        return user;
      }
    })
  ],

  callbacks: {
    //4. jwt 만들 때 실행되는 코드 
    //jwt에 토큰들과 만료기간,user를 담아 보냄
    async jwt({ token, account, profile }) {
      if (account?.provider === 'naver') {
        
        const exUser = await prisma.user.findFirst({
          where: { name: token.name, email: token.email },
        });

        // 등록된 유저가 아니라면 회원가입
        if (!exUser) {
          await prisma.user.create({
            data: {
              name: token.name,
              email: token.email,
            },
          });
        }
        token.accessToken = account.access_token
        token.expiresAt = account.expires_at
        token.refreshToken = account.refresh_token
      }
      
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    //jwt토큰정보를 session에 유지시키게 됨
    async session({ session, token }) {
      const exUser = await prisma.user.findUnique({
        where: {
          email: session.user.email
        },
        select: {
          id: true,
          name: true,
          email: true,
        }
      })
      
      session.token = token
      session.user = exUser;
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

