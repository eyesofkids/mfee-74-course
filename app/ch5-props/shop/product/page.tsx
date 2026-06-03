'use client';

import Link from 'next/link';

// 定義商品項目的型別
interface ProductItem {
  id: number;
  name: string;
  price: number;
}

// 商品資料範例(注意沒有count屬性)
const products: ProductItem[] = [
  {
    id: 0,
    name: '小熊餅乾',
    price: 50,
  },
  {
    id: 1,
    name: '巧克力豆餅乾',
    price: 100,
  },
  {
    id: 2,
    name: '小老板海苔',
    price: 150,
  },
];

export default function ProductPage() {
  return (
    <>
      <h1>商品列表</h1>
      <Link href="./cart">連至購物車</Link>
      <hr />
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              {product.name}(NT${product.price})
              <button
                onClick={() => {
                  // TODO: 等context完成要從useCart匯入
                  // onAdd(product);
                }}
              >
                加入購物車
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
