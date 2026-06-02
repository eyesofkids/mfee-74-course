'use client';

// 導入類型(型別)
import { Todo } from '../_types/todo';
// 導入子元件
import ListItem from './list-item';

export interface ListProps {
  todos: Todo[];
  onToggleCompleted: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function List({
  todos,
  onToggleCompleted,
  onRemove,
}: ListProps) {
  return (
    <>
      <ul>
        {todos.map((todo) => {
          return (
            <ListItem
              key={todo.id}
              todo={todo}
              onRemove={onRemove}
              onToggleCompleted={onToggleCompleted}
            />
          );
        })}
      </ul>
    </>
  );
}
