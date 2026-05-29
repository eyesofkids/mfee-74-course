'use client';

import { useState } from 'react';

export default function CondRenderPage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>JSX條件式渲染範例</h1>
      <hr />
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -1
      </button>
      <hr />
      {/* 三元表達式，相當於if...else */}
      {count ? <p>1. count目前是{count}</p> : null}
      {/* 三元，建議的寫法，把判斷條件寫清楚 */}
      {count !== 0 ? <p>2. count目前是{count}</p> : null}
      {/* 這個判斷條件會用falsy判斷，如果count是0或NaN會在畫面上渲染。產生不需要的結果 */}
      {count && <p>3. count目前是{count}</p>}
      {/* 解決方案1. : 強制將條件判斷轉為布林值 */}
      {Boolean(count) && <p>4. count目前是{count}</p>}
      {!!count && <p>5. count目前是{count}</p>}
      {/* 解決方案2. : 用比較運算(>, <, !==, ===) */}
      {count !== 0 && <p>6. count目前是{count}</p>}
    </>
  );
}
