'use client';

import { useState, useEffect } from 'react';

export default function PatternPage() {
  const [count, setCount] = useState(0);

  // 樣式1: 沒有第二個傳入參數
  // 用途: 少用。審計/除錯/日誌，或是特殊的自訂勾子(rwd或需要不斷監聽)
  useEffect(() => {
    console.log('這個元件每次`渲染``之後`都會執行我一次');
  });

  // 樣式2-1: 有第二個傳入參數(陣列)，但陣列是空的
  // 意義: `didMount`(first render)時間點的類似生命周期方法
  // 用途: 常用。元件初始化與伺服器ajax/fetch資料。自訂事件/第三方js整合(類似真實DOM的ready事件)
  useEffect(() => {
    console.log('這個元件第一次`渲染``之後`執行我一次(之後不執行)');
  }, []); // 不與任何的相依變數關聯

  // derived state(衍生的狀態) 這種也能放在相依變數陣列中，和放count效果一樣
  const doubleCount = count * 2;

  // 樣式2-2: 有第二個傳入參數(陣列)，但陣列裡有成員
  // 意義: `didMount`(first render)+`didUpdate`(re-render)時間點的類似生命周期方法
  useEffect(() => {
    console.log(
      '這個元件第一次`渲染``之後`執行我一次。接下來如果相依變數有更動，再執行一次'
    );
  }, [count]); // 只有"狀態"或"屬性"(或兩者的一部份，或是計算衍生的變數)加到這個"相依變數陣列"才有作用

  return (
    <>
      <h1>useEffect應用3+1種樣式</h1>
      <hr />
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>
    </>
  );
}
