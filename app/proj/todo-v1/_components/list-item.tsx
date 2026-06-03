'use client';

// 導入類型(型別)
import { Todo } from '../_types/todo';

export interface ListItemProps {
  todo: Todo;
  onToggleCompleted: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function ListItem({
  todo,
  onToggleCompleted,
  onRemove,
}: ListItemProps) {
  return (
    <>
      <li key={todo.id}>
        <input
          type="checkbox"
          // 核取方塊是用checked布林值代表是否有被選中
          checked={todo.completed}
          onChange={() => {
            onToggleCompleted(todo.id);
          }}
        />
        {/* 依照completed狀態的不同來切換樣式(條件式樣式) */}
        <span
          style={{
            color: todo.completed ? 'gray' : 'black',
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.text}
        </span>

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
    </>
  );
}
