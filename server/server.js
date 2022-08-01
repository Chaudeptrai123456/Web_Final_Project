const express = require("express");
const routeOrg = require("../server/src/routes/routeOrganization");
const routeProject = require("../server/src/routes/routeProject");
const routeUser = require("../server/src/routes/routeUser");
const connectDB = require("./src/service/connectDB");
const cors = require("cors");
const morgan = require("morgan");
const cookieSession = require('cookie-session')
const passport = require('passport')
const routeFirebase = require('./src/routes/routeFirebase')
const socketChat = require('./src/service/chat.socket.io')
require("dotenv").config();
const app = express();
const http = require('http')
const jwt = require('./src/service/jwtHandler')
const server = http.createServer(app)
require('dotenv').config()
const {
    Server
} = require('socket.io');
const io = new Server(server)
socketChat.handler(io)
const port = process.env.PORT;
app.use(
    cors({
        origin: ["http://localhost:3000","http://127.0.0.1:5500"],
        optionsSuccessStatus: 200,
       
    })
);
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(morgan());
app.use(
    express.urlencoded({
        extended: true,
    })
);
routeOrg(app);
routeProject(app);
routeUser(app);
routeFirebase(app)
connectDB.connect();
server.listen(port, () => console.log(`port : ${port}`));