import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import user from './src/views/user.js'

dotenv.config()

const app = express()
const port = process.env.PORT

// CORS
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Request-Date'],
};
app.use(cors(corsOptions));

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