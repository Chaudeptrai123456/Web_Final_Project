 
import producCrud from '../sevice/product_crud'
import ordercrud from '../sevice/order_crud'
import  jwttoken from '../sevice/jwttoken'
import jwt from "jsonwebtoken"
import usercrud from '../sevice/userservice'
import db from"../models/index";

const querystring = require('query-string')
 
let shoppingpage = ()=>{
    return '/pages/Shopping.ejs'
}

let showitem = async(req,res)=>{
    let productlist = await producCrud.getAllProduct()
    let user = await usercrud.getuserbyid(req.body.iduser)

    let token = await jwttoken.createjwttoken(user)
     
    res.status(200).json({
        message:"sản phẩm hiện có",
        productList:productlist,
        tokenuser:token
    })
}

let cartofuser = async (req,res)=> {
    let orderlist = await ordercrud.showAllorders();
    res.status(200).json({
        message:"200",
        order_list:orderlist
    })
}

let addproducttocart = async (req,res) =>{
     
    if (req.body.idproduct) {
        if (req.body.idproduct && req.body.amount >0 ) {
            let neworder = {
            
                idproduct:parseInt(req.body.idproduct),
                iduser:parseInt(req.body.iduser),
                amount: parseInt(req.body.amount)
            }
             
            console.log(neworder)
            let order1 =  await ordercrud.creatneworder(neworder)
            //a[i].dataValues.iduser
            console.log(order1)
            let productlist = await ordercrud.showAllProductInCart(req.body.iduser)
             
             let total =  await  ordercrud.totalcost(productlist)
            total = total.toFixed(2) 
           /* res.json({
                message:"them vao vo hang",
                productlist:productlist ,
                total:total
            })*/
            let result = await ordercrud.productlistofcart(productlist)
            console.log("cart   ",result)
            console.log("product  ",productlist)
            res.render("pages/Cart.ejs",{
                message:"them vao vo hang",
                iduser:req.body.iduser,
                productlist:result ,
                total:total,
                token:req.body.token
            }) 
        }   else {
            var date = new Date()
              await db.order.destroy({
                where:{
                    idproduct:parseInt(req.body.idproduct),
                    iduser:parseInt(req.body.iduser),
                    createdAt: date
                }
            })
             
            let productlist = await ordercrud.showAllProductInCart(req.body.iduser)
            let result = await ordercrud.productlistofcart(productlist)
            let total =  await  ordercrud.totalcost(productlist)
            total = total.toFixed(2) 
           /* res.json({
                message:"them vao vo hang",
                productlist:productlist ,
                total:total
            })*/
            
            res.render("pages/Cart.ejs",{
                message:"them vao vo hang",
                iduser:req.body.iduser,
                productlist:result ,
                total:total,
                token:req.body.token
            }) 
        }
    }


     
    
     
}

let cartofuserbyid = async(req,res)=>{
    let productlist = await ordercrud.cartofuser(req.query.iduser)
    let result = await ordercrud.productlistofcart(productlist)

    let total =  await  ordercrud.totalcost(productlist)
    total = total.toFixed(2) 
   /* res.json({
        message:"them vao vo hang",
        productlist:productlist ,
        total:total 
    })*/
    console.log(req.query.token)
    res.render("pages/Cartofuser.ejs",{

        message:"them vao vo hang",
        iduser:req.query.iduser,
        productlist:result ,
        total:total,
        token:req.query.token
    }) 
}

let allProductInCart = async (req,res)=>{
    const decoded =   jwt.verify(req.headers['access-token'], process.env.ACCESS_TOKEN_SECRET);
    let idofuser = decoded.userdata.user.id
    let date = Date()
    let cartOfCart =  await ordercrud.showAllProductInCart(idofuser,date)
    
     
    for (let i in cartOfCart) {
        arrayproduct.push({
            nameProduct:i.idproduct,
            amount:i.amount,
        })
    }

    
    /*
      
    res.status(200).json({
        message:"All product",
        product:cartOfCart 
    })   */   
} 

let search = async(req,res)=>{
     
        let product = await producCrud.findProductbyName(req.body.nameproduct)
        const decode = jwt.decode(req.body.token)
        console.log(decode)

        let user = await db.User.findOne({
            where:{
                email:decode.userdata.email
            }
        })
        console.log(user)
        
        return res.render('pages/Shopping.ejs',{
            id:decode.userdata.id,
            token :req.body.token,  
            productlist :product,
            name:user.dataValues.firstname
        })
     
   
}

let confirmorder = async(req,res)=>{
     
    let a=  await ordercrud.confirmorder(req.body.iduser)
     
    let productlist = await ordercrud.showAllProductInCart(req.body.iduser)
             
    let total =  await  ordercrud.totalcost(productlist)
   total = total.toFixed(2) 
  /* res.json({
       message:"them vao vo hang",
       productlist:productlist ,
       total:total

       getuserbyid
   })*/
    let userdata = await usercrud.getuserbyid(req.body.iduser) 
 
    let token = await jwttoken.createjwttoken(userdata)
    let productlist1 = await producCrud.getAllProduct()
    let user = await db.User.findOne({
        where:{
            id:req.body.iduser
        }
    })
    console.log("asdsa    ",user)
   if (userdata.dataValues.roleid ==='USER') {
       return res.render('pages/Shopping.ejs',{
           id:userdata.dataValues.id,
           token :token,
           productlist :productlist1,
            name:user.dataValues.firstname
       })
   } else { 
    let result = await ordercrud.productlistofcart(productlist)
    console.log("result  ",result)
    res.render("pages/Cart.ejs",{
        message:"them vao vo hang",
        iduser:req.body.iduser,
        productlist:result ,
        total:total
    })}
  
    
}
 

module.exports={
    Allitems:showitem,
    cartofuser:cartofuser,
    cartofuser:allProductInCart,
    allProductInCart:allProductInCart,
    shoppingpage:shoppingpage,
    addproducttocart:addproducttocart,
    search:search,
    confirmorder:confirmorder,
    cartofuserbyid:cartofuserbyid
}