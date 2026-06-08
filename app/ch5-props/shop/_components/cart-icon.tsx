'use client';

import { useCart } from '@/context/cart';
import { FaShoppingCart } from 'react-icons/fa'; // Import the icon
import './cart-icon.css'; // Import the CSS styles

export default function CartIcon() {
  // 取得數量
  const { totalQty } = useCart();
  return (
    <>
      <div
        className="cart-container"
        
        aria-label={`Shopping cart with ${totalQty} items`}
      >
        <FaShoppingCart className="cart-icon" />
        {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
      </div>
    </>
  );
}
