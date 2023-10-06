import express from 'express'
import dotenv from 'dotenv'
import conn from './src/db/mysql/index.js'
import router from './src/routes/users.js'

dotenv.config()

const app = express()
const port = process.env.PORT

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