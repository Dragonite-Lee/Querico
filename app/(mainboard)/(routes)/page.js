import Link from "next/link";


export default function Home() {
  return (
    <div>
      <Link href="/recipe/create">
        글 작성하기
      </Link>
    </div>
  );
}
