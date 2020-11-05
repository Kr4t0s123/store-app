const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash');
const fs = require('fs');


exports.getProductById = async (req,res,next,id) => {
    
    try {
        const product = await Product.findById(id)
       
        if(!product)
        {
            throw new Error();
        }
      
        req.product = product
        next();
    } catch (error) {
        res.status(400).json({ error : "Unable To Find Product"})
    }
}


exports.getAllProducts = async (req, res) => {
        let limit = req.query.limit ? parseInt(req.query.limit) : 8;
        let SortBy = req.query.SortBy ? req.query.SortBy : '_id'
        try {
           const products =  await Product.find({}).select('-photo').populate('category').sort([[SortBy, 'asc']]).limit(limit)
           res.json(products)
        } catch (error) {
            res.status(400).json({ error : "No Products found"})
        }
}

exports.createProduct = async (req,res) => {

    const form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, async (error, fields, files)=>{
        if(error)
        {
            return res.status(400).json({ error : "Problem with Image"})
        }
        // console.log(fields)
        const { name , description, price, category, stock} = fields
        if( !name || !description || !price || !category || !stock)
        {
            return res.status(400).json({ error : "Please Enter all fields" })
        }
        let product = new Product(fields)
        if(files.photo)
        {
            if(files.photo.size > 3000000)
            {
                return res.status(400).jsno({ error : "File is too big!"})
            }

            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        //saving in DB
        try {
            await product.save()
            res.json(product)
        } catch (error) {
            res.status(400).json({ error : "Saving tshirt in DB failed"})
        }

    })

}

exports.getProduct= async(req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

exports.photo=(req,res,next)=>{
    if(req.product.photo.data)
    {
        res.set('Content-Type',req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.deleteProduct= async(req, res)=>{
    const product = req.product;

    try {
        await product.remove();
        res.json({ message : "Deletion was a success"})
    } catch (error) {
        res.status(400).jsno({ error : "Falied To Delete product"})
    }
}

exports.updateProduct=(req,res)=>{
    
    const form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, async (error, fields, file)=>{
        if(error)
        {
            return res.status(400).json({ error : "Problem with Image"})
        }
        
        let product = req.product
        product = _.extend(product , fields)


        if(file.photo)
        {
            if(file.photo.size > 3000000)
            {
                return res.status(400).jsno({ error : "File is too big!"})
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }


        //saving in DB
        try {
            await product.save()
            res.json(product)
        } catch (error) {
            res.status(400).json({ error : "Updation of Product failed"})
        }

    })
}


exports.updateStock=(req , res, next)=>{

    let myOperations = req.body.order.products.map((product)=>{
         return {
             updateOne : {
                filter : { _id : product._id},
                update : {$inc : { stock : -product.count, sold : +product.count }}
             }
         }
    })
    
    Product.bulkWrite(myOperations ,{},(error , products)=>{
        if(error)
        {
            res.status(400).jons({ error : "Bulk Opeartion Failed"})
        }
        next();
    })

}

exports.getAllUniqueCategories = (req , res) => {
    Product.distinct('category',(error , category)=>{
        if(error)
        {
            res.status(400).json({ error : "No Category Found"})
        }
        res.json(category)
    })
}