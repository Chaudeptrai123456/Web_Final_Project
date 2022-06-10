import { promise, reject } from "bcrypt/promises";
import db from"../models/index";
import user_crud from'../sevice/userservice'
const { Op } = require("sequelize");
import productcrud from'../sevice/product_crud'
let showAllorders = async ()=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let list = await db.order.findAll({
                 
            })
            
             

            let result = []
                    for (var i =0;i<list.length;i++) {
                        console.log(list[i].idproduct)
                        let product = await db.product.findOne({
                            where:{
                                id:list[i].idproduct
                            
                            }
                        })
                         
                         
                        let user = await db.User.findOne({
                            where:{
                                id:list[i].iduser
                            }
                        })
                         
                        result.push({
                            id:list[i].id,
                            iduser:list[i].iduser,
                            
                            Name: product.dataValues.nameproduct,
                            cost:(list[i].amount *product.dataValues.cost).toFixed(2),
                            amount:list[i].amount,
                         //   phone:user.dataValues.phone,
                            createdAt:list[i].createdAt,
                            paymentmethob:list[i].paymentmethob,
                            updatedAt:list[i].updatedAt,
                            description:product.dataValues.description
                        })
                    }
                    
                    resolve(result)
        }catch(e) {
            reject(e)
        }
    })

}

let findorderbyiduser= async(idorder) =>{

   return new Promise(async(resovle,reject)=>{
    try {
        let list = await db.order.findAll({
            where:{
                iduser:idorder
            }
        })
         
        let result = []
                for (var i =0;i<list.length;i++) {
                    let product = await db.product.findOne({
                        where:{
                            id:list[i].idproduct
                        }
                    })
                     
                    let user = await user_crud.getuserbyid(list[i].iduser)

                    result.push({
                        id:list[i].id,
                        iduser:list[i].iduser,
                        
                        Name: product.nameproduct,
                        cost:(list[i].amount *product.cost).toFixed(2),
                        amount:list[i].amount,
                       // phone:user.dataValues.phone,
                        createdAt:list[i].createdAt,
                        paymentmethob:list[i].paymentmethob,
                        updatedAt:list[i].updatedAt,
                        description:product.description
                    })
                }
                 
                resovle(result)
    }catch(e) {
        reject(e)
    }
   })
   
}
 
let creatneworder = async(updateorder) =>{
    return new Promise(async(resolve,reject)=>{
        
        try {
             let order = await db.order.findOne({
                where:{
                    idproduct:updateorder.idproduct,
                    iduser:updateorder.iduser,
                    paymentmethob:null
                  }
            })
             let product = await db.product.findOne({
                where:{
                    id:updateorder.idproduct 
                }
            })
             
            

            if (order) {
                if (product.dataValues.quantity > updateorder.amount) {
                    console.log("quantity",product.dataValues.quantity)

                order.dataValues.amount = updateorder.amount
                product.dataValues.quantity -= updateorder.amount
                
                await product.save()
                let a = await order.save()
                resolve(a)
                } else {
                    order.dataValues.amount = product.dataValues.quantity
                    product.dataValues.quantity -= product.dataValues.quantity
                    await product.save()
                    let b = await order.save()
                    resolve(b)
                }
            }  
            
            else {
                let newoder  =await db.order.create({
                
                    idproduct: updateorder.idproduct,
                    iduser:updateorder.iduser,
                    amount:updateorder.amount,
    
                })
                resolve(newoder)
            }

        } catch(e) {
            reject(e)
        }
    })
}
let cartofuser = async(iduser)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let cart = await db.order.findAll(
              {
                where: {
                    iduser:iduser,
                    [Op.or]: [
                        { paymentmethob: "confirm" },
                        { paymentmethob: "Was Transport" },
                        {paymentmethob:"Have Paid"}
                        /**
                         * 
                         * ,
                        
                         * 
                         */
                      ]
                     
                }
              }
            )
            console.log("cart ",cart)
            resolve(cart)
        } catch(e) {
            reject(e)
        }
    })
}

let showAllProductInCart = async(iduser)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let cart = await db.order.findAll(
              {
                where: {
                    iduser:iduser,
                    paymentmethob:null
                }
              }
            )
           // console.log("cart ",cart)
            resolve(cart)
        } catch(e) {
            reject(e)
        }
    })
}

let totalcost = async (listproduct) =>{
    
    return new Promise(async(resovle,reject)=>{
        try {
            let total = 0
            
            for (var i = 0 ;i<listproduct.length;i++) {
            
               let product = await db.product.findOne({
                   where:{
                       id:listproduct[i].dataValues.idproduct
                   }
               })
                
                total = total +  product.cost*listproduct[i].dataValues.amount;
        }
            
            resovle(total)
        }
       
         catch(e) {
            reject(e)
        }
        
    })
}

let productlistofcart =async (order) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            let result = []
            for (var i =0;i<order.length;i++) {
                let product = await db.product.findOne({
                    where:{
                        id:order[i].dataValues.idproduct
                    }
                })
                 
                result.push({
                    id:order[i].dataValues.id,
                    idproduct:product.dataValues.id,
                    iduser:order[i].dataValues.iduser,
                    Name: product.dataValues.nameproduct,
                    cost:(order[i].dataValues.amount *product.dataValues.cost).toFixed(2),
                    amount:order[i].dataValues.amount,
                    status:order[i].dataValues.paymentmethob,
                    Date : order[i].dataValues.createdAt,
                    description:product.dataValues.description
                })
            }
            resolve(result)
        } catch(e) {
            reject(e)
        }
       
    })
}

let deleteorder = async (idorder)=>{
    return new Promise(async (resovle,reject)=>{
        try {
            let order =  await db.order.destroy({
                where:{
                    id:idorder
                }
            })
            resovle(order)
        } catch(e) {
            reject(e)
        }
        
    })
}

let findorderbyid =async (idorder)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let product = await db.order.findOne({
                where:{
                    iduser:idorder
                }
            })
            resolve(product)
        } catch(e) {
            reject(e)
        }
       
    })
}

let confirmorder = async (iduser)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let orderlist = await db.order.findAll({
                where :{
                    paymentmethob:null,
                    iduser:iduser
                }
            })
            
            orderlist.forEach(async (element) =>{
                
                let product =await productcrud.findProductbyId(element.dataValues.idproduct)
                let a  = product.dataValues.quantity - element.dataValues.amount
                if ( a >= 0) {
                    await product.set({
                        quantity:a
                    })
                    await product.save()
                    element.paymentmethob="confirm"
                    await element.save()
                } else {
                    await product.set({
                        quantity:0
                    })
                    await product.save()
                    element.paymentmethob="confirm"
                    element.amount = product.quantity
                    await element.save()
                }




                
                
            })

            resolve(orderlist)
        } catch(e) {
            reject(e)
        }
        
    })
}

let findAllconfirmorderbyuserid = async (iduser)=>{
     
}

module.exports = {
    showAllorders:showAllorders,
    findorderbyiduser:findorderbyiduser,
    showAllProductInCart:showAllProductInCart,
    creatneworder:creatneworder,
    totalcost:totalcost,
    findorderbyid:findorderbyid,
    productlistofcart:productlistofcart,
    deleteorder:deleteorder,
    cartofuser:cartofuser,
    confirmorder:confirmorder
}