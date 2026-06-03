'use client';

import Link from 'next/link';

// 定義購買的商品項目的型別
interface CartItem {
  id: number;
  name: string;
  count: number; // 購物車項目才有數量的屬性
  price: number;
}

// 購物車項目的範例
const initialItems: CartItem[] = [
  {
    id: 0,
    name: '小熊餅乾',
    count: 1,
    price: 50,
  },
  {
    id: 1,
    name: '巧克力豆餅乾',
    count: 5,
    price: 100,
  },
  {
    id: 2,
    name: '小老板海苔',
    count: 2,
    price: 150,
  },
];

export default function CartPage() {
  // TODO: 等context完成要從useCart匯入
  const items = initialItems;

  return (
    <>
      <h1>購物車</h1>
      <Link href="./product">連至商品列表</Link>
      <hr />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} NT${item.price} (<b>{item.count}</b>)
            <button
              onClick={() => {
                // TODO: 等context完成要從useCart匯入
                // onIncrease(item.id);
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                // 如果目前商品數量為1
                if (item.count === 1) {
                  // 作法1: 最少要買一件，所以到商品是1時不再能刪除
                  // alert('最少要購買一件商品!');

                  // 作法2: 再按下去會變為0，所以提示要作刪除
                  // 比較好的使用者體驗，刪除前要加確認視窗
                  if (confirm('你確定要移除這個商品嗎?')) {
                    // TODO: 等context完成要從useCart匯入
                    //  onRemove(item.id);
                  }
                } else {
                  // TODO: 等context完成要從useCart匯入
                  // onDecrease(item.id);
                }
              }}
            >
              –
            </button>
            <button
              onClick={() => {
                // 比較好的使用者體驗，刪除前要加確認視窗
                if (confirm('你確定要移除這個商品嗎?')) {
                  // TODO: 等context完成要從useCart匯入
                  // onRemove(item.id);
                }
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <hr />
      {/* 顯示總數量和總金額 */}
      {/* TODO: 等context完成要從useCart匯入 */}
      {/* <p>
        總數量: {totalQty} / 總金額: {totalAmount}
      </p> */}
    </>
  );
}
