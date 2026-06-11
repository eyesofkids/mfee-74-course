'use client';

// 導入next提供的有自動圖片最佳化的元件
import Image from 'next/image';
import Link from 'next/link';
// 載入動畫
import CssLoader from '../_components/css-loader';
// 導入css樣式
import '../_styles/product-table.css';

// // 導入專門在網頁一開始就作fetch樣式的鉤子
// import { useFetch } from '@/hooks/use-fetch';

import useSWR from 'swr';
// 客製化swr要用的獲取函式
const fetcher = (...args: [input: RequestInfo, init?: RequestInit]) =>
  fetch(...args).then((res) => res.json());

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
  // 重複利用useFetch寫好的商業邏輯
  const { data, isLoading } = useSWR<Product[]>(url, fetcher);
  const products = data;

  if (isLoading) {
    return (
      <>
        <CssLoader />
      </>
    );
  }

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
          {products?.map((product) => {
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
                  <Link href={`./detail?id=${product.id}`}>詳情</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
