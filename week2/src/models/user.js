import pool from '../utils/db.js';

export const get = async (id) => {
    const conn = await pool.getConnection()
        .catch(err => { throw err });
    try {
        const query = 'SELECT * FROM user WHERE id = ?';
        const [rows] = await conn.query(query, [id]);
        return rows;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

export const add = async (name, email, password) => {
    const conn = await pool.getConnection()
        .catch(err => { throw err });
    try {
        const query = 'INSERT INTO user (name, email, password, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)';
        const [rows] = await conn.query(query, [name, email, password]);
        return rows.insertId;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}