import express from 'express'
import { checkRequestDate } from '../utils/validate.js'
import { addUser, getUser} from '../controllers/users.js'

const router = express.Router()

// Healthcheck API
router.get('/healthcheck', (req, res) => {
  res.send('Healthcheck OK!')
})

// Users API
router.use(checkRequestDate)
router.use(express.json())
router.get('/users/:id', getUser)
router.post('/users', addUser)

export default router