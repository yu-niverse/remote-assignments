import express from 'express'
const app = express()
const PORT = 3000

// healthcheck API
app.get('/healthcheck', (req, res) => {
  res.send('Healthcheck OK!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})