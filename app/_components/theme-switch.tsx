'use client';

// 導入context專用的自訂名稱鉤子
import { useTheme } from '@/context/theme';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button onClick={toggleTheme}>
        切換為 {theme === 'dark' ? '明亮' : '黑暗'}佈景
      </button>
    </div>
  );
}
