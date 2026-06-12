import Link from 'next/link';
// 新增表單(rcc)
import AddForm from '../_components/add-form';

export default async function AddPage() {
  return (
    <>
      <h1>文章新增</h1>
      <Link href="/rsc-blog">列表</Link>
      <hr />
      <AddForm />
    </>
  );
}
