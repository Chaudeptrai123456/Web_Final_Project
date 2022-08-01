require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwtService = require('../service/jwtHandler')
module.exports = {
    user: async (req, res, next) => {
        try {
            let token = req.headers.accsesstoken || req.body.accsesstoken
            jwt.verify(token, process.env.accessTokenSecret, (err, decoded) => {
                if (err) {
                    console.log(err)
                    return res.status(300).json({
                        message: 'invalue token'
                    })
                }
                req.decoded = decoded
                next()
            })
        } catch (err) {
            return res.status(400).json({
                message: 'not token provided'
            })
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            let token = req.headers.accsesstoken || req.headers.refreshToken|| req.body.accsesstoken|| req.body.refreshToken
            let isToken = await jwtService.verifyToken(token, process.env.refreshTokenSecret)
            if (isToken) {
                req.decoded = isToken
                next()
            } else {
                return res.status(400).json({message:'invalid refresh token'})
            }
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }
    }
}