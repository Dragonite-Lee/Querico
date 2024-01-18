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

        const jwt = require("jsonwebtoken");//이 부분으로 토큰 만들고 로그인할때마다 토큰 업데이트시켜줘야됨 혹은 디비에 토큰을 빼볼까..? 그래도될듯 
        const access_token = jwt.sign({ email: user.email, name: user.name }, process.env.CREDENTIALS_SECRET_KEY, {
          expiresIn: "1h",
        });
        const refresh_token = jwt.sign({ email: user.email, name: user.name }, process.env.REFRESH_SECRET_KEY, {
          expiresIn: "30d",
        });

        if (!account) {
          const newAccount = await prisma.account.create({
            data: {
              userId: user.id,
              type: "credentials",
              provider: "credentials",
              providerAccountId: String(new Date().getTime() + Math.floor(Math.random() + 1)),
              access_token: access_token,
              refresh_token: refresh_token,
              expires_at: Math.round(Date.now() / 1000) + 1 * 60 * 60,
              expires_refresh: Math.round(Date.now() / 1000) + 30 * 24 * 60 * 60,
            }
          });
        } 

        if (account) {
          const updateAccount = await prisma.account.updateMany({
            where: { userId: user.id, },
            data: {
              access_token: access_token,
              refresh_token: refresh_token,
              expires_at: Math.round(Date.now() / 1000) + 1 * 60 * 60,
              expires_refresh: Math.round(Date.now() / 1000) + 30 * 24 * 60 * 60,
            }
          })
        }

        return user;
      }
    })
  ],

  callbacks: {
    //4. jwt 만들 때 실행되는 코드 
    //jwt에 토큰들과 만료기간,user를 담아 보냄
    async jwt({ token, account, profile }) {
      const exUser = await prisma.user.findFirst({
        where: { name: token.name, email: token.email },
      });

      const nowTime = Math.round(Date.now() / 1000);
      const shouldRefreshTime = token.expiresAt - 10 * 60 - nowTime;

      if (account?.provider === 'naver') {
        token.accessToken = account.access_token
        token.expiresAt = account.expires_at
        token.refreshToken = account.refresh_token

        if (shouldRefreshTime > 0) {
          return token
        }
        
        return refreshNaverAccessToken(token);
      } else {
        const exAccount = await prisma.account.findUnique({
          where: { userId: exUser.id },
          select: {
            type: true,
            access_token: true,
            refresh_token: true,
            expires_at: true,
          }
        })

        token.accessToken = exAccount.access_token
        token.expiresAt = exAccount.expires_at
        token.refreshToken = exAccount.refresh_token

        if (shouldRefreshTime > 0) {
          return token
        }
        
        return refreshCredentialsAccessToken(token);
      }

      
      
      
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
  },
  pages: {
    signIn: "/login",
  },
  adapter : PrismaAdapter(prisma),
  debug: process.env.NODE_ENV == 'development',

};
export default NextAuth(authOptions); 

async function refreshNaverAccessToken(token) {
  try {
    const url = 'https://developers.naver.com/docs/login/api/api.md#6-1-2--%EC%A0%91%EA%B7%BC-%ED%86%A0%ED%81%B0-%EB%B0%9C%EA%B8%89-%EC%9A%94%EC%B2%AD'
    
    const params = {
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    }

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    const res = await axios.post(url, null, {
      headers,
      params,
      auth: {
        username: process.env.NAVER_CLIENT_ID,
        password: process.env.NAVER_CLIENT_SECRET,
      },
    })

    const refreshedTokens = await res.data

    if (res.status !== 200) {
      return {
        ...token,
        refreshedToken: '',
      }
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expiresAt: Math.round(Date.now() / 1000) + refreshedTokens.expires_in,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }

  } catch (error) {
    return {
      ...token,
      error: error,
    }
  }
}

async function refreshCredentialsAccessToken(token) {
  try {
    const url = '/api/refreshAccess';
    const data = {
      "refresh_token": token.refreshToken,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const res = await axios.post(url, data, {
      headers,
    });

    if (res.status == 401 && res.data == "TOKEN_EXPIRE") {
      token.refreshToken = '';
      token.accessToken= '';
      token.expiresAt= '';
      return token;
    };

    const refreshedTokens = await res.data;

    token.accessToken= refreshedTokens.access_token;
    token.expiresAt= refreshedTokens.expires_in;

    return token;
  } catch (error) {
    return {
      ...token,
      error: error,
    }
  }
}