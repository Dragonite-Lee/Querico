import { connectDB } from '@/util/database'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

export default async function handler(요청, 응답) {

    const client = await connectDB;
    const db = client.db("blog")
    let userInfo = await getServerSession(요청, 응답, authOptions);
    
    if (요청.method == 'POST') {
        let data = {
            content : JSON.parse(요청.body).content,
            parent : new ObjectId(JSON.parse(요청.body).parent)
        }
        
        if (userInfo) {
            data.author = userInfo.user.email;
        }   
        if (data.content == "") {
            응답.status(400).json("댓글을 입력하세요")
        }
        if (요청.body.author == "") {
            응답.status(400).json("로그인 하세요")
        }
        try {
            let result = await db.collection('comment').insertOne(data);
            let commetList = await db.collection('comment').find({ parent : new ObjectId(JSON.parse(요청.body).parent) }).toArray();
            응답.status(200).json(commetList)
        } catch (error) { //DB예외처리
            응답.status(500).json("서버 에러")
        }
    }
}