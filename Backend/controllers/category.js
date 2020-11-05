const Category = require('../models/category')
const { reset } = require('nodemon')
const category = require('../models/category')

exports.getCategoryById= async (req ,res, next,id) => {

    try {
        const category = await Category.findById(id)
        if(!category)
        {
            throw new Error({ error : "Category Not found in DB"})
        }

        req.category = category
        next()
    } catch (e) {
        res.status(400).json({ error: e })
    }

}

exports.createCategory =async (req,res)=>{
    const category = new Category(req.body)

    try {
        await category.save();
        res.json(category)
    } catch (e) {
            res.status(400).json({ error : "Not able to Save Category in DB"})        
    }
}

exports.getCategory=(req, res)=>{
    return res.json(req.category)
}

exports.getAllCategory=async (req, res)=>{
    try {
        const categories = await Category.find({})
        if(!categories)
        {
               throw new Error({ error : "No Categories Found "}) 
        }
        res.json(categories)
    } catch (error) {
        res.status(400).json({ error })
    }
}

exports.updateCategory =async (req ,res) =>{
   
    const category = req.category
    category.name = req.body.name

    try {
        await category.save();
        res.json(category)
    } catch (error) {
        res.status(400).json({ error : "Failed To update Category"})
    }
}


exports.removeCategory= async(req,res)=>{
    const category = req.category

    try {
        await category.remove()
        res.json({ message : `Successfully Deleted Category ${category.name}`})
    } catch (error) {
       res.status(400).json({ error : "Unable To Remove"}) 
    }

}

