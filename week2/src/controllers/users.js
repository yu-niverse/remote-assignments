export const getUser = async (req, res) => {
    try {
        const requestDate = req.headers['request-date'];
        const id = parseInt(req.params.id);
        // check if id is valid
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid user ID' })
        }
        const db = req.conn
        const query = 'SELECT * FROM user WHERE id = ?'
        db.query(query, [id], function(err, rows) {
            if (err) throw err;
            // check if id exists
            if (rows.length == 0) {
                return res.status(403).json({ error: 'User not found' })
            }
            res.status(200).json({ 
                data: {
                    user : {
                        id: rows[0].id,
                        name: rows[0].name,
                        email: rows[0].email
                    },
                    'request-date': requestDate
                }
            })
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
}

export const addUser = async (req, res) => {
    try {
        const requestDate = req.headers['request-date'];
        const { name, email, password } = req.body
        // check for required fields
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email and password are required' })
        }
        // check name format (can only contain letters and digits)
        if (!name.match(/^[a-zA-Z0-9]+$/)) {
            return res.status(400).json({ error: 'Name can only contain letters and digits' })
        }
        // check email format (must be a valid email address)
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return res.status(400).json({ error: 'Invalid email format' })
        }
        // check password format
        const check = (/[a-z]/.test(password) ? 1 : 0) + (/[A-Z]/.test(password) ? 1 : 0) + (/[0-9]/.test(password) ? 1 : 0) + (/[~`!@#$%^&*()_\-+=|{}\[\]:;"'<>,.?/]/.test(password) ? 1 : 0)
        if (check < 3) {
            return res.status(400).json({ error: 'Password must contain at least three out of the four : lowercase letters, uppercase letters, numbers, symbols' })
        }
        // check if email already exists
        const db = req.conn
        let query = 'SELECT * FROM user WHERE email = ?'
        db.query(query, [email], function(err, rows) {
            if (err) throw err;
            if (rows.length > 0) {
                return res.status(409).json({ error: 'Email already exists' })
            }
        });
        // store user into mysql database
        query = 'INSERT INTO user (name, email, password, created_at) VALUES (?, ?, MD5(?), CURRENT_TIMESTAMP)'
        db.query(query, [name, email, password], function(err, rows) {
            if (err) throw err;
            // response
            res.status(200).json({ 
                data: {
                    user : {
                        id: rows.insertId,
                        name: name,
                        email: email
                    },
                    'request-date': requestDate
                }
            })
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
}