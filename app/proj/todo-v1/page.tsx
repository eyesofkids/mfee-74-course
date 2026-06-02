'use client';

import { useState } from 'react';

// 範例資料(mock)
const initData = [
  {
    id: 'u001',
    text: '繳電信費',
    completed: false, // 代表這個事項完成(true)，未完成(false)
  },
  { id: 'u002', text: '寫作業', completed: true },
];

export default function TodoPage() {
  // 記錄待辨事項的狀態
  const [todos, setTodos] = useState(initData);
  // 宣告給文字輸入框使用的狀態
  const [inputText, setInputText] = useState('');

  // 處理刪除
  const onRemove = (todoId: string) => {
    const nextTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(nextTodos);
  };

  // 處理完成/未完成的切換
  const onToggleCompleted = (todoId: string) => {
    const nextTodos = todos.map((todo) => {
      // 對符合條件的物件作修改
      if (todo.id === todoId) {
        // 用展開運算子進行複製物件，並修改它的completed值(true <--> false
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    // 設定回狀態
    setTodos(nextTodos);
  };

  return (
    <>
      <h1>待辨事項</h1>
      <hr />
      <input
        type="text"
        // 狀態是什麼 -> 文字輸入框呈現什麼
        value={inputText}
        // 在文字輸入框輸入了什麼 -> 狀態更動成什麼
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        // 按下enter鍵要觸發加入到todos
        onKeyDown={(e) => {
          // 按下enter鍵而且有輸入文字的情況下
          if (e.key === 'Enter' && inputText.trim()) {
            // 建立新的todo
            const newTodo = {
              id: crypto.randomUUID(), //新項目使用uuid當作id
              text: inputText,
              completed: false,
            };
            // 狀態更動第1、2步。加到新狀態的最前面
            const nextTodos = [newTodo, ...todos];
            // 狀態更動第3步
            setTodos(nextTodos);

            // 清空文字輸入框
            setInputText('');
          }
        }}
      />
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                // 核取方塊是用checked布林值代表是否有被選中
                checked={todo.completed}
                onChange={() => {
                  onToggleCompleted(todo.id);
                }}
              />
              {todo.text}
              <button
                onClick={() => {
                  if (confirm('你確定要刪除這個項目？')) {
                    onRemove(todo.id);
                  }
                }}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
