import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2'
import router from './src/routes/users.js'
dotenv.config()

const app = express()
const port = process.env.PORT

// MySQL connection
var conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});
conn.connect(function(err) {
  if (err) {
    console.log('MySQL connection error');
    return;
  }
  console.log('MySQL connection established');
});

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  req.conn = conn;
  console.log(req.method, req.url)
  next()
});

// Routes
app.use('', router);

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port} ...`)
})