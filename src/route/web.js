import express from"express"
import usercontroller from "../controller/usercontroller"
import homepage from "../controller/hometroller"
import auth from'../midlewave/auth'
import ordercontroller from '../controller/ordercontroller'
import admincontroller from '../controller/admincontroller'
 
let router = express.Router();

let initwebroute = (app) =>{
 
    router.get("/personalpage",homepage.getpersonalpage)
        
    router.get("/crud/create",homepage.crud)    

    router.post("/crud/post",homepage.crudprocesssingin)

    router.get("/AI/checkmodels",homepage.AI)
    

    router.get("/crud/get",homepage.displayalluser)

    router.get("/crud/checkuser",homepage.checkuserbyid)

    router.post("/crud/updateuser",homepage.updateinformationofuser)
    ///crud/delete?id=<%= datatable[i].id%>
    router.get("/crud/delete",homepage.deleteuserbyid)

    router.get("/",usercontroller.loginpage)
    
    router.post("/api/handlelogin",usercontroller.handlelogin)

    router.post("/api/signin",usercontroller.handlesignin)
   
    router.get('/api/Shopping',ordercontroller.shoppingpage)

    router.post("/api/admin/crudproduct/addnewproduct",auth.authenloginadmin,admincontroller.addnewproduct)


    router.post("/api/admin/crudproduct/updateproduct",auth.authenloginadmin,admincontroller.updateProduct)
 
    router.get('/api/Shopping',ordercontroller.shoppingpage)

    router.post("/api/shopping",ordercontroller.Allitems)

    router.post("/api/shopping/cart",auth.authenloginuser,ordercontroller.cartofuser)

    router.post("/api/shopping/addtocart",auth.authenloginuser,ordercontroller.allProductInCart)
    
    router.get("/api/shopping/cartofuserbyid",auth.autheniduserbyid,ordercontroller.cartofuserbyid)
       
    router.post("/api/searchproductbyname",ordercontroller.search)

    router.post("/api/addproducttocart"/*,auth.authenloginuser*/,ordercontroller.addproducttocart)

    router.post("/api/crud/signin",usercontroller.handlesignin)

    router.get("/api/signin",usercontroller.signin)

    router.get("/login",homepage.handlelogin)


    router.get("/api/user/cart/payment",usercontroller.paypages)

    router.get("/api/admin/user",admincontroller.displayalluser)

    router.get("/api/admin/product",admincontroller.displayallproduct)
    router.get("/api/admin/order",admincontroller.displayallorder)


    router.post("/api/searchuser",admincontroller.searchuser)
    router.post("/api/searchrpoduct",admincontroller.searchproduct)
    router.post("/api/searchorder",admincontroller.searchorder)


    router.get("/api/createproduct",admincontroller.creatproductpage)
    router.post("/api/handlecreateproduct" , admincontroller.handlecreateproduct)

 
    //router.get("/api/admin/updateproduct")
    router.get("/api/user/cart/cancle",usercontroller.cancleorer)
 

    router.post("/api/user/cart/confirm",ordercontroller.confirmorder)

    router.get('/api/admin/updateproductpage',admincontroller.updateproductpage)

    router.post('/api/admin/handleproductupdate',admincontroller.handleproductupdate)

    router.get("/api/admin/updateorderpage",admincontroller.updateorderpage)

    router.post('/api/admin/handleupdateorder',admincontroller.handleorderupdate)

    router.get("/crud/deleteorder",admincontroller.handledeleteorder)

    router.get("/crud/deleteproduct",admincontroller.handledeleteproduct)

    router.post("/amid/uploadimage",admincontroller.handleupload)

    router.get("/api/user/homepage",homepage.gethomepage)

    router.post("/api/user/paypal",usercontroller.pay)

    router.get("/api/user/paypage",usercontroller.paypages)

    router.post("/api/user/zalopay",usercontroller.pay)

    router.post("/api/user/handlepayment",usercontroller.handlepayment)

    router.get('/api/user/chatwithadmin',usercontroller.chatrealtimepage)


    return app.use("/",router);
}

module.exports = initwebroute