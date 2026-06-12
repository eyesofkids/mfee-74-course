import db from '@/lib/db';
import Link from 'next/link';

interface PageParams {
  id: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostDetailPageProps {
  params: Promise<PageParams>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  // 從動態路由參數中得到id(以資料夾命名為準`[id]`)
  const id = Number((await params).id);
  // 執行sql
  const [posts] = (await db.query(`SELECT * FROM blog WHERE id=${id}`)) as [
    Post[],
    any,
  ];
  // 只需要一筆
  const post = posts[0];

  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
        文章詳情(RSC)
      </h1>
      <Link
        href={`/rsc/`}
        className='class="text-gray-900 underline decoration-gray-300 hover:decoration-blue-600 hover:text-blue-600 transition decoration-2 underline-offset-4"'
      >
        文章列表
      </Link>
      <hr />
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8 mb-4">
        標題：{post.title}
      </h2>
      <p>{post.content}</p>
    </>
  );
}
