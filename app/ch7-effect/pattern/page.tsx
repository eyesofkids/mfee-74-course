'use client';

import { useState, useEffect } from 'react';

export default function PatternPage() {
  const [count, setCount] = useState(0);
  
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
