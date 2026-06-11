'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
// 載入動畫
import CssLoader from '../_components/css-loader';
// 需要安裝 npm i swr
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

export default function ProductPage() {
  // 如果網址上的設計是 product-v2/detail?id=xxx
  const sp = useSearchParams();
  const id = sp.get('id');
  // 重複利用useFetch寫好的商業邏輯
  const { data, isLoading } = useSWR<Product>(url + id, fetcher);
  const product = data;

  if (isLoading) {
    return (
      <>
        <CssLoader />
      </>
    );
  }

  return (
    <>
      <h1>商品詳細</h1>
      <Link href="./list">列表</Link>
      <hr />
      <h2>{product?.name}</h2>
      {product?.image_url ? (
        <Image
          src={product.image_url}
          width={200}
          height={200}
          alt={product.name}
          loading="lazy"
        />
      ) : null}

      <p>編號: {product?.id}</p>
      <p>價格: {product?.price}</p>
    </>
  );
}
