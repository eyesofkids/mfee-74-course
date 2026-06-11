'use client';

import { useState, useEffect } from 'react';
// 導入next提供的有自動圖片最佳化的元件
import Image from 'next/image';
import Link from 'next/link';
// 導入css樣式
import '../_styles/product-table.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

// 資料來源:
const url =
  'https://my-json-server.typicode.com/eyesofkids/json-fake-data/products/';

export default function ProductTablePage() {
  // 需要定義狀態，因為觸發更新階段(狀態需要更動才行)
  const [products, setProducts] = useState<Product[]>([]);

  // 元件第一次`渲染``之後`執行一次
  useEffect(() => {
    // 定義要向伺服器要商品資料的函式
    const getProducts = async () => {
      const res = await fetch(url);
      const resData = await res.json();
      setProducts(resData);
    };
    // 呼叫函式
    getProducts();
  }, []);

  return (
    <>
      <h1>商品列表</h1>
      <hr />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>圖片</th>
            <th>名稱</th>
            <th>價格</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {/* 常用的map撰寫風格： 英文複數名詞 map 單數名詞 */}
          {/* 例如: products -> product */}
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <Image
                    src={product.image_url}
                    width={100}
                    height={100}
                    alt={product.name}
                    loading="lazy"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  {/* 連結改為搜尋參數的樣式 */}
                  <Link href={`./detail?id=${product.id}`}>
                    詳情
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
