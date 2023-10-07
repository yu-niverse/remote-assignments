import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

conn.connect((err) => {
  if (err) {
    console.error('MySQL connection error');
    throw err;
  }
  console.log('MySQL connection established');
});

export default conn;