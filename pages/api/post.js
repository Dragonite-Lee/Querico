import { connectDB } from '@/util/database'
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(요청, 응답) {

    const client = await connectDB;
    const db = client.db("blog")
    let userInfo = await getServerSession(요청, 응답, authOptions);
    if (userInfo) {
        요청.body.author = userInfo.user.email;
    }

    if (요청.method == 'POST') {
        if (요청.body.title == "" || 요청.body.content == "") {
            응답.status(400).json("제목과 내용을 입력하세요")
        }
        try {
            let result = await db.collection('post').insertOne(요청.body);
            // 응답.status(200).json("작성완료")
            return 응답.redirect(302,'/list')//응답과 동시에 페이지 이동시킴
        } catch (error) { //DB예외처리
            응답.status(500).json("서버 에러")
        }
    }
}