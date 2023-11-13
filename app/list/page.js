import { connectDB } from '@/util/database'
import DetailLink from './DetailLink';
import Link from 'next/link';
import ListItem from './ListItem';

export const dynamic = 'force-dynamic'

export const revalidate = 60;

export default async function List() {

    const client = await connectDB;
    const db = client.db("blog")

    let result = await db.collection('post').find().toArray()
    
    return (
      <div className="list-bg">
        <ListItem result={result} />
      </div>
    )
  } 