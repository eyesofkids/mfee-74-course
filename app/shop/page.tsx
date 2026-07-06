'use client';

import { useState } from 'react';

export default function ShopPage() {
  const [amount, setAmount] = useState(200);

  return (
    <>
      <h1>Shop Page</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button
        onClick={() => {
          window.location.href = `/api/ecpay?amount=${amount}&items=商品1x100,商品2x200,商品3x300`;
        }}
      >
        付款去
      </button>
    </>
  );
}
