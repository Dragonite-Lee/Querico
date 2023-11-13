'use client'

import { useEffect, useState } from "react"


export default function Comment({id}) {
    let [comment, setComment] = useState('');
    let [commentList, setCommentList] = useState([]);
    let senddata = {
        parent : id,
        content: comment
    }

    useEffect(()=>{
        fetch(`/api/comment/list?parentId=${id}`)
        .then(res => res.json())
        .then((data) => {
            setCommentList(data);
        })
    },[])
    
    return (
        <div>
          <div>댓글목록 보여줄 부분</div>

          <input type="text" onChange={(e) => {setComment(e.target.value)}}/>

          <button onClick={() => {
            fetch('/api/comment/new', {method : 'POST', body : JSON.stringify(senddata)})
                .then(res => res.json())
                .then((data) => {
                    setCommentList(data);
                })
          }}>
            댓글전송
          </button>
          <div>
            {
                commentList.length > 0 ?
                commentList.map((data) => (
                    <div key={data._id}>
                        <div>{data.content}</div>
                        <div>{data.author}</div>
                    </div>
                ))
                : '댓글없음'
            }
          </div>
         
        </div>
    )
}