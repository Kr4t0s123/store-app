const express = require('express')
const router = express.Router();

const { isSignedIn , isAuthenticated , isAdmin } = require('../controllers/auth')
const { getUserById , pushOrderInPurchaseList } = require('../controllers/user')
const {updatOrderStatus,getOrderStatus, getOrderById , createOrder , getAllOrders} = require('../controllers/order')
const { updateStock } = require('../controllers/product')

//params
router.param('userId', getUserById)
router.param('orderId', getOrderById)

//Routes
router.post('/order/create/:userId',isSignedIn , isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)

router.get('/order/all/:userId',isSignedIn , isAuthenticated ,isAdmin,getAllOrders)


router.get('/order/status/:orderId/:userId',isSignedIn , isAuthenticated ,isAdmin,getOrderStatus)

router.put('/order/status/:orderId/:userId',isSignedIn , isAuthenticated ,isAdmin,updatOrderStatus)

module.exports = router