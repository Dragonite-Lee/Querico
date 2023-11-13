'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function DarkMode(){
    let router = useRouter();
    let dlmode
    useEffect(() => {
        //새로고침할 때마다 쿠키가 생성되면 안되니까 mode라는 이름의 쿠키가 있는지 검사함 
        //현잰 light라고 나옴
        dlmode = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
        if (dlmode == '') {
            document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
        }   
    }, [])


  return (
    <div>
        {
            dlmode == 'light' 
            ? (
                <span onClick={()=>{ 
                    document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400)
                    router.refresh()
                    }}>
                    🌙
                </span>
            )
            : (
                <span onClick={()=>{ 
                    document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400)
                    router.refresh()
                    }}>
                    ☀️
                </span>
            )
        }
    </div>
    
  )
}