'use client';

import Link from 'next/link';
import DeleteForm from './delete-form';
import { useRouter } from 'next/navigation';
import { ListProps } from '../_types';

export default function List({ posts = [] }: ListProps) {
  // 路由器
  const router = useRouter();

  return (
    <>
      <ul>
        {posts.map((post) => {
          return (
            <li
              key={post.id}
              style={{ padding: 8, backgroundColor: '#ccc', margin: 10 }}
            >
              <Link href={`/rsc-blog/${post.id}`}> {post.title}</Link>
              <button
                onClick={() => {
                  router.push(`/rsc-blog/update/${post.id}`);
                }}
              >
                編輯
              </button>
              <DeleteForm id={post.id} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
