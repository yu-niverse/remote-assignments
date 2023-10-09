export const checkName = (name) => {
    return name.match(/^[a-zA-Z0-9]+$/);
}

export const checkEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

export const checkPassword = (password) => {
    const check = (/[a-z]/.test(password) ? 1 : 0) + (/[A-Z]/.test(password) ? 1 : 0) + (/[0-9]/.test(password) ? 1 : 0) + (/[~`!@#$%^&*()_\-+=|{}\[\]:;"'<>,.?/]/.test(password) ? 1 : 0)
    return check >= 3;
}

export const checkRequestDate = (req, res, next) => {
    const httpDatePattern = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4} \d{2}:\d{2}:\d{2} GMT$|^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), \d{2}-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2} \d{2}:\d{2}:\d{2} GMT$|^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (0[1-9]|[12]\d|3[01]) \d{2}:\d{2}:\d{2} \d{4}$/;
    const requestDate = req.headers['request-date'];
    if (!requestDate) {
        return res.status(400).json({ error: 'Request date is required' })
    }
    if (httpDatePattern.test(requestDate) === false) {
        return res.status(400).json({ error: 'Invalid request date' })
    }
    req.requestDate = requestDate;
    next();
}