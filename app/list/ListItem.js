'use client'

import Link from "next/link"
import DetailLink from "./DetailLink"

export default function ListItem({result}) {
    
    return (
        <div>
            {result.map((data) => {
            
                return (
                    <div className="list-item" key={data._id.toString()} >
                        <h4>{data.title}</h4>
                        <p>{data.content}</p>
                        <p>{data.author}</p>
                        <Link href={'/edit/' + data._id.toString()} className="list-btn">✏️</Link>
                        <DetailLink id={data._id.toString()} />
                        <button onClick={(e)=>{
                            fetch('/api/delete', {
                                method : 'POST',
                                body : data._id.toString()
                            })
                            .then((r)=>{
                                if(r.status == 200) {
                                    return r.json()
                                } else {
                                    //서버가 에러코드전송시 실행할코드
                                }
                                })
                                .then((result)=>{ 
                                //성공시 실행할코드
                                    e.target.parentElement.style.opacity = 0;
                                    setTimeout(()=>{
                                        e.target.parentElement.style.display = 'none';
                                    },1000)
                                }).catch((error)=>{
                                //인터넷문제 등으로 실패시 실행할코드
                                console.log(error)
                                })
                            // fetch(`/api/test?id=${data._id.toString()}`)
                        }}>
                            🗑️
                        </button>
                    </div>
                )
            })}
        </div>
    )
}