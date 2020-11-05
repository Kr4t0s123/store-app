const {  Order , ProductCart } = require('../models/order')

exports.getOrderById= async (req, res,next,id) => {

    try {
        const order = await Order.findById(id).populate('products.product',"name price")
        req.order = order
        next()
    } catch (error) {
        res.status(400).json({ error : "No order Found In DB"})
    }
}
  
exports.createOrder= async (req , res) => {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)

    try {
        await order.save();
        res.json(order)
    } catch (error) {
        res.status(400).json({ error : "Falied To save your order in DB"})
    }
}

exports.getAllOrders=async(req,res)=>{

    try {
        const orders = await Order.find({})
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error : "No orders found in DB"})
    }
}

exports.getOrderStatus=(req ,res)=>{
    return res.json(Order.schema.path('status').enumValues)    
}

exports.updatOrderStatus=async(req,res)=>{
    try {
        const order = await Order.update({_id : req.body.orderId},{$set : { status : req.body.status}})
        res.json(order)
    } catch (error) {
        res.status(404).json({ error : "Cannot Update order status"})
    }
}