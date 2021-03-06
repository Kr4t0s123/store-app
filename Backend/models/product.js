const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId } = Schema
const productSchema = new Schema({
    name : {
        type : String,
        maxlength : 32,
        required : true,
        trim : true
    },
    description : {
        type : String,
        maxlength : 2000,
        required : true,
        trim : true
    },
    price : {
        type : Number ,
        maxlength : 32,
        required : true
    },
    category : {
        type : ObjectId ,
        ref : "Category",
        required : true
    },
    stock : {
        type : Number ,
    },
    sold : {
        type : Number ,
        default : 0
    },
    photo : {
        data : Buffer,
        contentType : String
    }

} , { timestamps : true})

module.exports = mongoose.model("Product" , productSchema)