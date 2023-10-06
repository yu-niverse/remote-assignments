import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

var conn = null;
export const DB_Init = async () => {
    try {
        conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
        console.log('MySQL connection established');
    }
    catch (err) {
        console.log(`${err.name}: ${err.message}`);
        throw err;
    }
}

export default conn;