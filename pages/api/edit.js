import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'
 
export default async function handler(요청, 응답) {

    const client = await connectDB;
    const db = client.db("blog")

    

    if (요청.method == 'POST') {
        let 수정내용 = {title : 요청.body.title, content : 요청.body.content};

        if (요청.body.title == "" && 요청.body.content == "") {
            응답.status(400).json("수정할 내용이 없습니다. 원본 그대로 유지합니다.")
        }

        try {
            await db.collection('post').updateOne({_id : new ObjectId(요청.body._id)},
            {$set : 수정내용})
            return 응답.redirect(302,'/list');
        } catch {
            응답.status(500).json("서버 에러")
        }
    }
}