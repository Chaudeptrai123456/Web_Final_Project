import crudservice from"../sevice/crud_user";
 
 import jwttoken from'../sevice/jwttoken'
import product_crud from '../sevice/product_crud'
import orders_crud from '../sevice/order_crud'
import userservice from'../sevice/userservice'
const jwt = require('jsonwebtoken');
 require('dotenv').config()
let gethomepage =  async(req,res) => {
   // console.log(req.query.iduser)
    //let userdata = await userservice.getuserbyid(req.query.iduser)
   
    //let token =   jwttoken.createjwttoken(userdata)
   //  console.log(userdata)
    const token = req.query.token || req.body.token
    const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    console.log(decode)
    let productlist = await product_crud.getAllProduct()
    res.render('pages/Shopping.ejs',{
        id:req.query.iduser,
        token :token,
        productlist :productlist,
        name:decode.userdata.user.lastname
    })
 

}
let getpersonalpage =(req,res) => {
    return res.render('person/personalpage.ejs')
}

let crud = (req,res)=>{
    return res.render('crud_creat.ejs')
}
let crudprocesssingin= async (req,res)=>{


    let user =  await crudservice.createuser(req.body)


    
    let list = await crudservice.getalluser();
    if (user) {
         
        res.render("displayuserlist.ejs",{
            datatable:list
        })
    }
    
    
}

let displayalluser = async (req,res)=>{
    let list = await crudservice.getalluser();
    let produtcs = await product_crud.getAllProduct();
    let orderlist = await orders_crud.showAllorders();

    let result = []


    for (var i =0;i<orderlist.lenght;i++) {

        let product = await product_crud.findProductbyId(orderlist[i].idproduct)
        let cost = product.dataValues.cost * orderlist[i].amount

        result.push({
            id: orderlist[i].id,
            iduser: orderlist[i].iduser,
            idproduct: orderlist[i].idproduct,
            amount: orderlist[i].amount,
            paymentmethob: orderlist[i].paymentmethob,
            createdAt: orderlist[i].createdAt,
            cost: cost
        })
    }



    console.log(orderlist)
     res.render("displayuserlist.ejs",{
        datatable:list,
        productlist:produtcs,
        orderlist:orderlist
    })
}

let checkuserbyid = async (req,res) =>{
     
    if (req.query.id != null) {
        let userdata =  await crudservice.checkuserbyid(req.query.id)
         
        res.render("crud_update.ejs",{
            id:req.query.id,
            userdata:userdata
        })
    } else {
        res.send("đéo có ID")
    }
    
}

let updateinformationofuser =async (req,res) =>{
    await crudservice.updateuserbyid(req.body)
    let list = await crudservice.getalluser();
    res.render("displayuserlist.ejs",{
        datatable:list
    })
}

let deleteuserbyid = async (req,res)=>{
    if (req.query.id == null) {
        res.send("cút mẹ đi")
    } else {
        await crudservice.deleteuserbyid(req.query.id)
        let list = await crudservice.getalluser();
    res.render("displayuserlist.ejs",{
        datatable:list
    })
    }
     
}

let handlelogin = (req,res)=>{
    
}
let AI =   (req,res)=>{
    res.render('AI.ejs')
}
 

module.exports = {
    AI:AI,
    gethomepage : gethomepage,
    getpersonalpage:getpersonalpage,
    crud:crud,
    crudprocesssingin:crudprocesssingin,
    displayalluser:displayalluser,
    checkuserbyid:checkuserbyid,
    updateinformationofuser:updateinformationofuser,
    deleteuserbyid:deleteuserbyid,
    handlelogin:handlelogin
}