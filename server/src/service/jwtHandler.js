const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = {
    create: (usedID) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(usedID)
                let token = jwt.sign({usedID}, process.env.accessTokenSecret, {
                    expiresIn: '10min'
                })
                let refresh = jwt.sign({usedID}, process.env.refreshTokenSecret, {
                    expiresIn: '24h'
                })
                resolve({
                    accessToken: token,
                    refreshToken: refresh
                })
            } catch (err) {
                reject(err)
            }
        })
    },
    verifyToken: (token, secretKey) => {
        return new Promise(async (resolve, reject) => {
            jwt.verify(token, secretKey, (err, decodeData) => {
                if (err) {
                    reject(err)
                }
                resolve(decodeData)
            })
        })
    },
    generateAccessToken : (usedID) =>{
        let token = jwt.sign({usedID}, process.env.accessTokenSecret, {
            expiresIn: '10min'
        })
        return token
    }
}