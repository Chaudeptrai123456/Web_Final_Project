const route = require('express').Router()

const routeFirebase = (app) => {
        // route.get('/', (req, res) => {
        //     res.sendFile('C:/Users/84833/Desktop/LoginWithGooeBE_Training/server/src/views/firebase.html')
        // })
        route.get('/', (req, res) => {
                res.sendFile('C:/Users/84833/Desktop/LoginWithGooeBE_Training/server/src/views/socket.io.html')
        })
            return app.use('/', route)
    }
module.exports = routeFirebase