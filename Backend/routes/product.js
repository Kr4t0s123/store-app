const express = require('express')
const router = express.Router();
const {getAllUniqueCategories , updateProduct,  deleteProduct , getAllProducts , getProductById , createProduct , getProduct , photo} = require('../controllers/product')
const { isAuthenticated , isSignedIn , isAdmin} = require('../controllers/auth')
const { getUserById } = require('../controllers/user');
const { route } = require('./auth');

//All params
router.param('productId' , getProductById)
router.param('userId', getUserById)

//Routes
//Create Route
router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin ,createProduct)

//Read Routes
router.get('/product/:productId',getProduct)
router.get('/product/photo/:productId',photo)
router.get('/products', getAllProducts)
router.get('/products/categories',getAllUniqueCategories)


//Update Route
router.put('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin ,updateProduct)


//Delete Route
router.delete('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,deleteProduct)

module.exports = router