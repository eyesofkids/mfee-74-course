'use client';

import { useCart } from '@/context/cart';

export default function CartIcon() {
  // 取得數量
  const { totalQty } = useCart();
  return (
    <>
      <div style={{ textAlign: 'right' }}>購物車({totalQty})</div>
    </>
  );
}
