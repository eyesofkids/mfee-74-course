'use client';

import { useState } from 'react';
// 加入樣式
import styles from './page.module.css';

interface RegisterFormData {
  fullName: string;
  email: string;
  pass: string;
  pass2: string;
}

interface RegisterFormDataError {
  fullName: string;
  email: string;
  pass: string;
  pass2: string;
}

export default function RegisterPage() {
  // 表單的狀態為一個物件值，屬性名稱對應到每個欄位的名稱(name)
  const [data, setData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    pass: '',
    pass2: '',
  });
  // 記錄錯誤訊息用的狀態
  const [errors, setErrors] = useState<RegisterFormDataError>({
    fullName: '',
    email: '',
    pass: '',
    pass2: '',
  });

  // 表單多個欄位共用的事件處理函式
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 可以觀察到每個欄位在觸發時得到的name, type, value
    console.log(e.target.name, e.target.type, e.target.value);
    // 物件中的`[e.target.name]`是"計算得出屬性名稱(computed property name)"
    // 代入一個字串(或能計算出字串)後，會轉變為屬性名稱
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // 處理表單送出
  const handleSubmit = (e: React.FormEvent) => {
    // 阻擋表單預設行為(預設行為，送到表單所在網址+填入值都放在網址上)
    e.preventDefault();
    // 得到目前表單輸入的值(從狀態或FormData)
    console.log(data);
    // 進行各欄位檢查
    // 定義一個全新的錯誤訊息物件
    const newErrors: RegisterFormDataError = {
      fullName: '',
      email: '',
      pass: '',
      pass2: '',
    };

    if (data.fullName === '') {
      newErrors.fullName = '請填寫姓名';
    }

    if (!data.email.includes('@')) {
      newErrors.email = '請填寫正確的電子郵件';
    }

    if (data.email === '') {
      newErrors.email = '請填寫電子郵件';
    }

    if (data.pass !== data.pass2) {
      newErrors.pass = '密碼與確認密碼需要相同';
      newErrors.pass2 = '密碼與確認密碼需要相同';
    }
    if (data.pass === '') {
      newErrors.pass = '請填寫密碼';
    }

    if (data.pass2 === '') {
      newErrors.pass2 = '請填寫確認密碼';
    }

    // 呈現錯誤訊息
    setErrors(newErrors);

    // 判斷是否有錯誤訊息(newErrors物件其中有任一個不是空白字串)
    const hasErrors = Object.values(newErrors).some((v) => v !== '');
    // 如果有錯誤訊息，跳出送出的表單函式，不往下執行
    if (hasErrors) return;

    // 檢查通過送到伺服器
    alert('沒有錯誤，送到伺服器');
  };

  return (
    <>
      <h1>註冊表單-可控元件範例</h1>
      <hr />
      {/* HTML5表單驗証必需在form標記內，是在form的submit事件前檢查 */}
      <form onSubmit={handleSubmit}>
        <div>
          姓名
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleFieldChange}
          />
        </div>
        {/* 呈現錯誤訊息用 */}
        <div className={styles.error}>{errors.fullName}</div>
        <div>
          電子郵件:
          <input
            // 改為email類型會有email的檢查
            type="text"
            name="email"
            value={data.email}
            onChange={handleFieldChange}
          />
        </div>
        <div className={styles.error}>{errors.email}</div>
        <div>
          密碼:
          <input
            type="text"
            name="pass"
            value={data.pass}
            onChange={handleFieldChange}
          />
        </div>
        <div className={styles.error}>{errors.pass}</div>
        <div>
          確認密碼:
          <input
            type="text"
            name="pass2"
            value={data.pass2}
            onChange={handleFieldChange}
          />
        </div>
        <div className={styles.error}>{errors.pass2}</div>
        <div>
          {/* 建議在form標記內的button要加上type，預設會是submit */}
          {/* 在form標記內作表單送出時，不要用button的onClick來送出表單資料 */}
          {/* 應該要用form的onSubmit事件來作這事 */}
          <button type="submit">註冊帳號</button>
          <button type="reset">清空</button>
        </div>
      </form>
    </>
  );
}
