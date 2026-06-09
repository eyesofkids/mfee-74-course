'use client';

export default function MyInputId() {
  // 錯誤示範，因為DOM查詢和呼叫document物件的方法有副作用
  // const inputElement = document.querySelector('#my-input')

  return (
    <>
      <h2>文字輸入框(使用id)</h2>
      <input type="text" id="my-input" />
      <button
        onClick={() => {
          // 正確作法，能在事件處理函式中呼叫
          const inputElement = document.querySelector('#my-input');

          alert((inputElement as HTMLInputElement).value);
        }}
      >
        得到輸入框輸入值
      </button>
    </>
  );
}
