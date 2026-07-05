// 說明：處理金流串接的路由
import { NextResponse, NextRequest } from 'next/server';
// 導入服務層的類別
import { getECPayParams } from '@/server/services/ecpay';

export async function GET(request: NextRequest) {
  // 取得查詢參數，與設定預設值
  const searchParams = request.nextUrl.searchParams;
  const amount = Number(searchParams.get('amount')) || 0;
  const items = searchParams.get('items') || '';

  // 取得金流參數
  const data = getECPayParams(amount, items);

  // 如果是開發環境，顯示部落格列表
  console.log(data);

  // API回應
  if (data.status === 'success') {
    return new Response(data?.payload?.htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });

    // return NextResponse.json(
    //   { status: 'success', data: data?.payload },
    //   { status: 200 }
    // );
  } else {
    return NextResponse.json(
      { status: 'error', message: data?.message || '未知錯誤' },
      { status: 200 }
    );
  }
}
