const jwt = require('jsonwebtoken')
const User = require("../models/User");

const verifyToken = async (req, res, next) => {

    const token = req.header('auth-token')

    if (!token) return res.status(401).json({ success: 'failed', msg:'unauthorized' })

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)

        const user = await User.findOne({ email: verified.email })

        if (!user) return res.status(400).json({success: 'failed', msg:'invalid token'})

        if (verified.id == user.id){
            req.user = verified
            next()
        }

    } catch (error) {
        res.status(400).json({success: 'failed', msg:'invalid token'})
    }
}

module.exports = verifyToken;