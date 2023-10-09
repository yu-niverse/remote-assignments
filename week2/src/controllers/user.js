import * as User from '../models/user.js'
import { checkName, checkEmail, checkPassword } from '../utils/validate.js'
import bcrypt from 'bcrypt'

export const getUser = async (req, res) => {
    try {
        // get id from request url
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid user ID' })
        }
        // get user from database
        const user = await User.get(id);
        // check if user exists
        if (user.length === 0) {
            return res.status(403).json({ error: 'User not found' })
        }
        // response
        res.status(200).json({
            data: {
                user: {
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email
                },
                'request-date': req.requestDate
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
}

export const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // check input fields
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email and password are required' })
        }
        if (!checkName(name)) {
            return res.status(400).json({ error: 'Name can only contain letters and digits' })
        }
        if (!checkEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' })
        }
        if (!checkPassword(password)) {
            return res.status(400).json({ error: 'Password must contain at least three out of the four : lowercase letters, uppercase letters, numbers, symbols' })
        }
        // hash password
        const hash = await bcrypt.hash(password, 10)
        // add user to database
        const id = await User.add(name, email, hash)
        // response
        res.status(201).json({
            data: {
                user: {
                    id: id,
                    name: name,
                    email: email
                },
                'request-date': req.requestDate
            }
        })
    }
    catch (err) {
        console.log(err)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email already exists' })
        }
        res.status(500).json({ error: err })
    }
}