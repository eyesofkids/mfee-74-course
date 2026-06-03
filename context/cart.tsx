// 第1步 建立context
'use client'; // context與Provider元件是客戶端元件的應用

import { createContext, useState, useContext } from 'react';

// 定義商品項目的型別
interface ProductItem {
  id: number;
  name: string;
  price: number;
}

// 定義購買的商品項目的型別
interface CartItem {
  id: number;
  name: string;
  count: number; // 購物車項目才有數量的屬性
  price: number;
}

// 要用context共享的value的類型
interface CartContextType {
  items: CartItem[];
  totalQty: number;
  totalAmount: number;
  onAdd: (product: ProductItem) => void;
  onDecrease: (itemId: number) => void;
  onIncrease: (itemId: number) => void;
  onRemove: (itemId: number) => void;
}

// 使用 null 作為預設值，這是 React Context 的常見做法
const CartContext = createContext<CartContextType | null>(null);
// 設定context的名稱，這是會在react devtools(瀏覽器擴充)上面會看到，方便除錯用(可選的)
CartContext.displayName = 'CartContext';

// 第3-1步，建立Provider元件
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // 處理遞增: 增加指定商品的數量
  const onIncrease = (itemId: number) => {
    const nextItems = items.map((v) => {
      // v代表每個在陣列中的物件，例如 {id:1, name:'a', count:1}
      if (v.id === itemId) {
        // 對符合條件的物件作修改
        // 用展開運算子作複製物件，並修改count屬性值+1
        return { ...v, count: v.count + 1 };
      } else {
        // 不符條件的直接回傳保持原樣
        return v;
      }
    });

    // 設定到狀態中成為新狀態
    setItems(nextItems);
  };

  // 處理遞減: 減少指定商品的數量
  const onDecrease = (itemId: number) => {
    const nextItems = items.map((v) => {
      // v代表每個在陣列中的物件，例如 {id:1, name:'a', count:1}
      if (v.id === itemId) {
        // 對符合條件的物件作修改
        // 用展開運算子作複製物件，並修改count屬性值-1
        return { ...v, count: v.count - 1 };
      } else {
        // 不符條件的直接回傳保持原樣
        return v;
      }
    });

    // 設定到狀態中成為新狀態
    setItems(nextItems);
  };

  // 處理刪除: 從購物車中刪除指定商品
  const onRemove = (itemId: number) => {
    // 刪除id為itemId
    const nextItems = items.filter((v) => {
      return v.id !== itemId;
    });
    // 設定到狀態中成為新狀態
    setItems(nextItems);
  };

  // 處理新增商品到購物車中
  const onAdd = (product: ProductItem) => {
    // 使用findIndex來尋找是否這個項目已經在購物車裡
    const foundIndex = items.findIndex((v) => v.id === product.id);

    // findIndex會返回找到的索引值(從左開始找)，沒找到則返回 -1
    if (foundIndex !== -1) {
      // 這裡是處理有找到(在購物車裡) ==> 作遞增數量
      onIncrease(product.id);
    } else {
      // 這裡是處理沒找到 ==> 新加入
      // 將商品轉換為購物車項目，並加入預設是 count:1 的屬性
      const newItem = { ...product, count: 1 };
      // 讓新加入的商品在最上面
      const nextItems = [newItem, ...items];
      // 設定到狀態中成為新狀態
      setItems(nextItems);
    }
  };

  // 計算總數量：使用 reduce 方法累加所有商品的數量
  // reduce(累加器函數, 初始值) - acc是累加器，item是當前項目，0是初始值
  const totalQty = items.reduce((acc, item) => acc + item.count, 0);
  // 計算總金額：使用 reduce 方法累加所有商品的總價
  // 每個商品的總價 = 單價 × 數量
  const totalAmount = items.reduce(
    (acc, item) => acc + item.count * item.price,
    0
  );
  return (
    <CartContext.Provider
      value={{
        items,
        totalQty,
        totalAmount,
        onAdd,
        onDecrease,
        onIncrease,
        onRemove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 自訂名稱鉤子(先包裝useContext+CartContext)
export const useCart = () => {
  // 從context值中解構出value中的值和切換函式
  const context = useContext(CartContext);

  if (!context) {
    throw Error('it must be used within CartProvider');
  }

  return context;
};
