 
 import express from"express";

import bodyparser from"body-parser";
import viewengine from"./config/viewEngine";
import initwebroute from"./route/web";
import  testconncet1 from "../src/config/connectDB";
import cors from 'cors'
import http from'http'
import {Server} from'socket.io'
 
let app = express()
 
require('dotenv').config()
 
var cookieparser = require('cookie-parser')
 

 
const server = http.createServer(app);
 
const io = new Server(server);

var path = require('path');

app.use(cors())
app.use(cookieparser())
app.options('/', cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

viewengine(app)
initwebroute(app)

testconncet1()

let port = process.env.PORT || 6969 


app.listen(port,()=>{
     
    console.log(`run on port ${port}`)
})