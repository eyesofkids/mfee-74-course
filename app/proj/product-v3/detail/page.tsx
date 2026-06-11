'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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
  // 需要定義狀態，因為觸發更新階段(狀態需要更動才行)
  const [product, setProduct] = useState<Product | null>(null);

  // 元件第一次`渲染``之後`執行一次
  useEffect(() => {
    // 定義要向伺服器要商品資料的函式
    const getProduct = async () => {
      const res = await fetch(url + id);
      const resData = await res.json();
      setProduct(resData);
    };
    // 呼叫函式
    getProduct();
  }, [id]);

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
