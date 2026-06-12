// 這是伺服器元件(rsc)，沒有'use client'
// 直接連接資料
import db from '@/lib/db';
//
import Link from 'next/link';
import { PostIdPageProps } from '../_types';
// 這是一個async函式(元件)
export default async function PostIdPage({ params }: PostIdPageProps) {
  // 從動態路由參數中得到id，對應資料夾名稱，轉換為數字
  const id = Number((await params).id);
  // 執行sql
  const [posts] = (await db.query(`SELECT * FROM blog WHERE id = ${id}`)) as [
    any[],
    any,
  ];
  // 只需要一筆資料
  const post = posts[0];

  console.log(post);
  return (
    <>
      <h1>文章詳細頁</h1>
      <Link href="/rsc-blog">列表</Link>
      <hr />
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </>
  );
}
