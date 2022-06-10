import bcrypt from'bcrypt'
import jwt from "jsonwebtoken"
import res from 'express/lib/response';
import  jwttoken from '../sevice/jwttoken'
import ordercrud from'../sevice/order_crud'
const fs = require('fs');
var path = require('path');
const formidable  =require('formidable')
require('dotenv').config()
let authenloginuser = async(req,res,next)=>{
     
    let token  = req.body.token || req.query.token || req.headers['access-token']
     if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    else {
      try {
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.decoded = decoded;
        // console.log(decoded.userdata.user.roleid)
        if(decoded.userdata.user.roleid === "USER" || decoded.userdata.user.roleid === "ADMIN"){
          return next();
        } else {
          res.status(403).json({message:"Chi dành cho User"})
        }
         
       
        } catch(err) {
        return res.status(401).json({message:"Invalid token"})
      }
        

      
    }
}

let autheniduserbyid = async(req,res,next)=>{
    let token = req.query.token; 
    if (token) {
      const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
      console.log("decode   ",decode)
      console.log("id user   ",req.query.iduser)
      if (decode.userdata.user.id == req.query.iduser) {
        next()
      } else {
        res.status(300).send("invalid token")
      }
    } else {
      res.status(500).send("not token")
    }

/*
    let token = req.query.token;
    const decode =   jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
      console.log("delaoaskdoasikdosakdo   " , decode.userdata.id)
      if(decode.userdata.id === req.query.iduser) {
        next()
      }*/
    
   

}
  

let authenloginadmin = async(req,res,next)=>{

  let token  = req.body.token || req.query.token || req.headers['access-token']
  if (!token) {
      return res.status(403).send("A token is required for authentication");
  }
  else {
    try {
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.decoded = decoded;
       console.log(decoded.userdata.user.roleid)
      if(decoded.userdata.user.roleid === "ADMIN"){
        return next();
      } else {
        res.status(403).json({message:"Chi dành cho AMIN"})
      }
       
     
    } catch(err) {
      return res.status(401).json({message:"Invalid token"})
    }
      

    
  }
  


}


let authenuertopurchase = async (req,res,next)=>{

  let token  = req.body.token || req.query.token || req.headers['access-token']

  if (token) {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    let order = await ordercrud.findorderbyid(req.body.idorder)
    
    console.log(order)
    console.log(decoded)
    if (order.dataValues.iduser === decoded.userdata.user.id) {
      next()
    } else {
      res.status(301).json({
        message:"invalue user"
      })
    }


  } else {
    res.status(400).json({
      message:"not have token"
    })
  }


}

let handleupfile = async(req,res,next) =>{
  const form = new formidable.IncomingForm()

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    next()

    res.json({ fields, files });
  });
}

module.exports = {
  authenloginuser:authenloginuser,
  authenloginadmin:authenloginadmin,
  authenuertopurchase:authenuertopurchase,
  autheniduserbyid:autheniduserbyid,
  handleupfile:handleupfile
}