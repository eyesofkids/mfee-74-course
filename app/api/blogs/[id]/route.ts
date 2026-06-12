import db from '@/lib/db';

// api路由: /api/blogs/[id]

// GET 一筆資料
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 從動態路由參數得到id(對應資料夾名稱[id])
  // 需要轉成數字資料類型
  const id = Number((await params).id);
  // 資料庫查詢得到資料
  const [blogs] = await db.query<any[]>(`SELECT * FROM blog WHERE id=${id}`);
  console.log(blogs);
  // 只需要1筆資料
  const blog = blogs[0];
  // 回應
  return Response.json({ status: 'success', data: { blog } });
}

// (PUT)更新資料
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 從動態路由參數中得到id (對應資料夾名稱)
  // 需要轉成數字資料類型
  const id = Number((await params).id);
  // 從request得到body資料
  const body = await request.json();
  console.log(body);

  // 從body得到title, content資料
  const { title, content } = body;
  // 執行查詢
  const [result] = await db.query(
    `UPDATE blog SET title = '${title}', content = '${content}' WHERE id = ${id};`
  );
  console.log(result);

  return Response.json({ status: 'success', data: null });
}

// (DELETE)刪除資料
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // 從動態路由參數中得到id (對應資料夾名稱)
  // 需要轉成數字資料類型
  const id = Number((await params).id);

  // 執行查詢
  const [result] = await db.query(`DELETE FROM blog WHERE id = ${id};`);
  console.log(result);

  return Response.json({ status: 'success', data: null });
}
