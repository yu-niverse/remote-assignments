import express from 'express'
import { addUser, getUser} from '../controllers/users.js'

const router = express.Router()

// Healthcheck API
router.get('/healthcheck', (req, res) => {
  res.send('Healthcheck OK!')
})

// Users API
router.get('/users/:id', getUser)
router.post('/users', addUser)

export default router