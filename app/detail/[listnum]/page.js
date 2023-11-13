import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'
import Comment from './Comment';

export default async function Detail(props) {

    const client = await connectDB;
    const db = client.db("blog")

    let result = await db.collection('post').findOne({ _id : new ObjectId(props.params.listnum) })
    
    return (
      <div>
        <h4>상세페이지임</h4>
        <h4>{result.title}</h4>
        <p>{result.content}</p>
        <Comment id={result._id.toString()} />
      </div>
    )
  }