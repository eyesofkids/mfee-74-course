'use client';

interface Post {
  id: number;
  title: string;
  context: string;
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
              {post.title}
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
