export default function Login(){
    return (
    <div className="p-20">
        <form action="/api/login" method="POST">
          <input name="id" placeholder="아이디"/>
          <input name="pw" placeholder="비밀번호"/>
          <button type="submit">회원가입</button>
        </form>
      </div>
    )
  }