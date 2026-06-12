// 這是伺服器元件(rsc)，沒有'use client'
// 直接連接資料
import db from '@/lib/db';
// 可以導入客戶端元件(rcc)，稱為交錯應用
import List from './_components/list';
//
import Link from 'next/link';

// 這是一個async函式(元件)
export default async function PostRscPage() {
  // 執行sql
  const [posts] = (await db.query(`SELECT * FROM blog`)) as [any[], any];
  console.log(posts);

  return (
    <>
      <h1>文章列表頁(rsc)</h1>
      <Link href="/rsc-blog/add">新增</Link>
      <hr />
      <List posts={posts} />
    </>
  );
}
