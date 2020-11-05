const express = require("express")
require('dotenv').config()
require('./db/db')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

//Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')

//Middlewares
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

//Routes
app.use('/api' , userRoutes)
app.use('/api' , authRoutes)
app.use('/api' , categoryRoutes)
app.use('/api' , productRoutes)
app.use('/api' , orderRoutes)
//PORT
const port = process.env.PORT ||  8000


app.listen(port , ()=>{
    console.log(`App is up and ruuning on ${port}`)
})