import db from '@/lib/db';

// api路由: /api/blogs

// GET 所有資料
export async function GET(request: Request) {
  // 資料庫查詢得到資料
  const [blogs] = await db.query(`SELECT * FROM blog`);
  console.log(blogs);
  // 回應
  return Response.json({ status: 'success', data: { blogs } });
}

// POST 新增用
export async function POST(request: Request) {
  // 得到前端傳來的資料
  const body = await request.json();
  console.log(body);
  // 解構出title, content
  const { title, content } = body;
  // 資料庫查詢-新增資料
  const [result] = await db.query(
    `INSERT INTO blog (title, content, updated_at) VALUES ('${title}', '${content}', NOW())`
  );
  console.log(result);
  // 回應
  return Response.json({ status: 'success', data: null });
}
