const User = require('../models/user')
const  { Order } = require('../models/order')

exports.getUserById = async (req,res,next,id)=>{

    try {
        const user = await User.findById(id)
        if(!user){
             throw new Error({ error : "No User was found in DB"})
        }
        req.profile = user 
        
        next()
    } catch (e) {
    
        res.status(400).json({ error : e})
    }
}

exports.getUser=(req,res)=>{
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile)

}

exports.updateUser=async(req, res)=>{
    try {
        const user  = await User.findByIdAndUpdate({ _id : req.profile._id} , { $set : req.body } , { new :true , useFindAndModify:false})
        user.salt = undefined
        user.encry_password = undefined
        user.createdAt = undefined
        user.updatedAt = undefined
        res.send(user)
    } catch (e) {
        res.status(400),json({ error : "Update Not successful"})
    }
   
}

exports.userPurchaseList= async (req,res) => {
    
    try {
        const order = await Order.find({ user : req.profile._id}).populate('user','_id name')
        if(!order)
        {
            throw new Error({ error : "No Order Of this User"})
        }
        res.json(order)
    } catch (e) {
        res.status(400).json({ error : e})
    }
}

exports.pushOrderInPurchaseList =(req, res , next)=> {
    let purchases = []

    req.body.order.products.forEach((product)=>{
         purchases.push({
             _id : product._id,
             name : product.name,
             description : product.description,
             category : product.category,
             quantity : product.quantity,
             amount : req.body.order.amount,
             transaction_id : req.body.order.transaction_id
         })
    })

    //store in User
    User.findOneAndUpdate({ _id :req.profile._id},{ $push : { purchases : purchases}}, { new : true } ,(error ,purchases)=>{
        if(error)
        {
             return res.status(400).json({ error : "Unable to save purchase list"})
        }
        next()
    })
}
        
  
