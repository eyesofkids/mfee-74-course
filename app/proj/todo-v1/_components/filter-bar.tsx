'use client';

import { FilterStatus } from '../_types/todo';

export interface FilterBarProps {
  filterStatus: FilterStatus;
  setFilterStatus: (filter: FilterStatus) => void;
}

export default function FilterBar({
  filterStatus,
  setFilterStatus,
}: FilterBarProps) {
  return (
    <>
      <button
        disabled={filterStatus === 'all'}
        onClick={() => {
          setFilterStatus('all');
        }}
      >
        全部
      </button>
      <button
        disabled={filterStatus === 'active'}
        onClick={() => {
          setFilterStatus('active');
        }}
      >
        進行中
      </button>
      <button
        disabled={filterStatus === 'completed'}
        onClick={() => {
          setFilterStatus('completed');
        }}
      >
        已完成
      </button>
    </>
  );
}
