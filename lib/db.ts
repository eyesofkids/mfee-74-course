import mysql from 'mysql2/promise';

// 資料庫連線設定
const dbConfig = {
  host: 'localhost',
  user: 'next_0612',
  password: '12345',
  database: 'next_0612',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// 建立連線池
const pool = mysql.createPool(dbConfig);

// 測試連線
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('資料庫連線成功！');
    connection.release();
    return true;
  } catch (error) {
    console.error('資料庫連線失敗:', error);
    return false;
  }
}

export default pool;
