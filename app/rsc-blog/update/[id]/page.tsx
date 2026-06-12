import db from '@/lib/db';
import Link from 'next/link';
// 更新表單
import UpdateForm from '../../_components/update-form';
import { BlogUpdateIdPageProps } from '../../_types';

export default async function BlogUpdateIdPage({
  params,
}: BlogUpdateIdPageProps) {
  // params屬性是promise，要使用await得到其中的資料
  // id要轉換為數字類型(網址上是字串)
  const id = Number((await params).id);
  // 用id查詢資料庫資料
  const [posts] = (await db.query(`SELECT * FROM blog WHERE id = ${id}`)) as [
    any[],
    any,
  ];
  // 只需要一筆資料(物件)
  const post = posts[0];

  return (
    <>
      <h1>修改文章</h1>
      <Link href="/rsc-blog">列表</Link>
      <hr />
      {/* 更新表單 */}
      <UpdateForm post={post} />
    </>
  );
}
