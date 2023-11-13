import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'
 
export default async function handler(요청, 응답) {

    const client = await connectDB;
    const db = client.db("blog")

    if (요청.method == 'GET') {
        console.log(요청.query)
        let result = await db.collection('post').deleteOne( {_id : new ObjectId(요청.query)} )
        console.log(result)
        응답.status(200).json('삭제 완료')
    }
}