'use client';

import { useState } from 'react';

// 範例資料(mock)
const initData = [
  {
    id: 1,
    text: '繳電信費',
  },
  { id: 2, text: '寫作業' },
];

export default function TodoPage() {
  // 記錄待辨事項的狀態
  const [todos, setTodos] = useState(initData);

  return (
    <>
      <h1>待辨事項</h1>
      <hr />
      <input type="text" />
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>{todo.text}</li>;
        })}
      </ul>
    </>
  );
}
