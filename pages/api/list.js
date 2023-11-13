import { connectDB } from '@/util/database'
 
export default async function handler(요청, 응답) {

    const client = await connectDB;
    const db = client.db("blog")

    let result = await db.collection('post').find().toArray()

    if (요청.method == 'GET') {
        응답.status(200).json(result)
    }
}