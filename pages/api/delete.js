import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
 
export default async function handler(요청, 응답) {

    const client = await connectDB;
    const db = client.db("blog");
    
    if (요청.method == 'POST') {
        let dbListAuth = await db.collection('post').findOne({_id : new ObjectId(요청.body)})
        let userInfo = await getServerSession(요청, 응답, authOptions)
        if (userInfo) {
            if (dbListAuth.author == userInfo.user.email) {
                let result = await db.collection('post').deleteOne({_id : new ObjectId(요청.body)})
                응답.status(200).json('삭제 완료')
            } else {
                응답.status(500).json('현재유저와 작성자 불일치')
            }
        } else {
            응답.status(500).json('로그인 해주세요.')
        }
        
    }
}