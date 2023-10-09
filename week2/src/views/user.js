import express from 'express'
import { checkRequestDate } from '../utils/validate.js'
import { addUser, getUser } from '../controllers/user.js'

const user = express.Router()

// Users API
user.use(checkRequestDate)
user.use(express.json())
user.get('/users/:id', getUser)
user.get('/users', (req, res) => { res.status(400).json({ error: 'User ID is required' }) })
user.post('/users', addUser)

export default user