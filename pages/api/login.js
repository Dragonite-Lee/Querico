import { connectDB } from '@/util/database'

export default async function handler(요청, 응답) {

    const client = await connectDB;
    const db = client.db("querico")

    let usedID = await db.collection('login').find().toArray();

    if (요청.method == 'POST') {
        
        //저장할 때, 아이디가 있으면 가입 불가
        usedID.map((data) => {
        if (요청.body.id == data.id) {
            응답.status(400).json('이미 존재하는 id입니다.')
        }
       })
        //아이디랑 비밀번호를 받아서 db에 저장 
        if (요청.body.id == "" || 요청.body.pw == "") {
            응답.status(400).json("id 및 pw를 입력해주세요.")
        }
        try {
            await db.collection('login').insertOne(요청.body);
            응답.status(200).json("회원가입 성공")
        } catch (error) { //DB예외처리  
            응답.status(500).json("서버 에러")
        }
        
    }
}