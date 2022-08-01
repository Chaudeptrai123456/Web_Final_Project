const express = require('express');
const route = express.Router();
const uploadImage = require('../service/multerConfig')
const projectController = require('../controller/projectHandler')
const userController = require('../controller/userHandler');
const authUser = require('../middleware/authenUser')
const passport = require('passport');
const auth = require('../middleware/authenUser')
require('../service/passport')
const routeUser = (app) => {
    route.get('/refreshToken', auth.refreshToken, userController.refreshToken)
    route.post('/register', uploadImage.single('avatar'), userController.register)
    route.post('/login', userController.login)
    route.patch('/update', userController.update)
    route.post('/creatproject', uploadImage.single('image'), projectController.creatProByUser)
    route.delete('/delete', userController.delete)
    route.post('/findAllProjectOfUser', projectController.findAllProjectOfUser)
    route.get('/findAllProject', authUser.user, projectController.findAllProject)
    route.get('/', (req, res) => {
        res.render('C:/Users/84833/Desktop/LoginWithGooeBE_Training/server/src/views/login.html')
    })
    route.get('/auth', passport.authenticate('google', {
        scope: ['email', 'profile']
    }))
    route.get('/authuser/callback', passport.authenticate('google', {

        successRedirect: '/user/loginSuccess',
        failureRedirect: '/user/loginFailure'
    }))
    route.get('/user/loginFailure', (req, res) => {
        console.log(req)
    })
    route.get('/loginSuccess', async (req, res) => {
        res.sendFile('C:/Users/84833/Desktop/LoginWithGooeBE_Training/server/src/views/socket.io.html', {
            data: req.user
        })
    })
    route.get('/chatRoom',(req,res)=>{
        res.status(200).sendFile('C:/Users/84833/Desktop/LoginWithGooeBE_Training/server/src/views/socket.io.html')
    })
    route.get('/createRoomPage',(req,res)=>{
        res.sendFile('C:/Users/84833/Desktop/LoginWithGooeBE_Training/server/src/views/createRoom.html') 
    })
    route.post('/handlercreatRoom', userController.createRoomChat)
    route.post('/handlerJoinInRoom',userController.joinRoom)
    return app.use('/user', route);
}
module.exports = routeUser