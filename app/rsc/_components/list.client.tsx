'use client';

import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface ListClientProps {
  posts: Post[];
}

export default function ListClient({ posts }: ListClientProps) {
  return (
    <>
      <ul className="pl-2 list-disc list-inside space-y-3 text-gray-700">
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link
                href={`/rsc/${post.id}`}
                className='class="text-gray-900 underline decoration-gray-300 hover:decoration-blue-600 hover:text-blue-600 transition decoration-2 underline-offset-4"'
              >
                {post.title}
              </Link>
              <button
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-2 py-1 rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => {
                  alert('like!');
                }}
              >
                Like!
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
