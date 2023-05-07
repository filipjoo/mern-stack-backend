const jwt = require('jsonwebtoken')
//.env読み込み
require('dotenv').config()
const secret_key = process.env.SECRET_KEY

const auth = async(req, res, next) => {
    if(req.method === 'GET') {
        return next()
    }

    const token = await req.headers.authorization.split(' ')[1]


    if(!token) {
        return res.status(401).json({ message: 'no token!' })
    }

    try {
        const decoded = await jwt.verify(token, secret_key)
        req.body.email = decoded.email
        return next()
    }
    catch(err) {
        return res.status(401).json({ message: 'invalid token!' })
    }
}

module.exports = auth