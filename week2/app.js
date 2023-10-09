import express from 'express'
import dotenv from 'dotenv'
import user from './src/views/user.js'

dotenv.config()

const app = express()
const port = process.env.PORT

// Middleware
app.use((req, res, next) => {
  // log each request to the console
  console.log(req.method, req.url)
  next()
});

// Routes
app.get('/healthcheck', (req, res) => {
  res.send('Healthcheck OK!')
})
app.use(user)

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port} ...`)
})