const mongoose = require('mongoose')
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String ,
        required : true,
        maxlength : 32 ,
        trim : true
    },
    lastname : {
        type : String ,
        maxlength : 32,
        trim : true
    },
    salt : String,
    userinfo :{
        type : String,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    encry_password : {
        type : String,
        required : true
    },
    role : {
        type : Number,
        default : 0

    },
    purchases: {
        type : Array,
        default : []
    }

} , { timestamps : true})
userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt= uuidv4();
        this.encry_password = this.securePassword(this._password)
    
        
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {
    authenticate : function(plainPassword){
        return this.securePassword(plainPassword) === this.encry_password
    },
    securePassword : function(plainPassword){
        
        if(!plainPassword)
            return "";
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');
        }catch(e){
            return "";
        }
        
    }
}


module.exports = mongoose.model("User" , userSchema)