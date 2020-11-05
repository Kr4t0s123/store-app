const User = require('../models/user')
const { body, validationResult } = require('express-validator');
const { reset } = require('nodemon');
const { use } = require('../routes/auth');
var jwt = require('jsonwebtoken');
var expressjwt = require('express-jwt');


exports.signup= async (req ,res) =>{

    const error = validationResult(req)
    if(!error.isEmpty())
    {
        return res.status(400).json({ error : error.array()[0].msg ,
                                      params : error.array()[0].param})
    }

   const user = new User(req.body)
   try {
       await user.save();
       res.json({
           name : user.name,
           email : user.email,
           id : user._id
       }) 
   } catch (e) {
       res.status(400).json({ error : e})
   } 
}

exports.signout = (req,res)=>{
    res.clearCookie('token')
    res.json({ message : "Sign out successfully"})
} 


exports.signin = async (req, res) =>{
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        return res.status(422).json({ error : error.array()[0].msg ,
                                      params : error.array()[0].param})
    }

    try {
        const { email , password } = req.body
        const user = await User.findOne({ email })
        if(!user)
        {
            return res.status(404).json({ error : "User does not exist"})
        }
        const isAuth = user.authenticate(password)
        if(!isAuth)
        {
            return res.status(401).json({ error : "Email or Password is not correct"})
        }
        //Create a token
        const token = jwt.sign({ _id : user._id} , process.env.SECRET)
        //Put token in cookie
        res.cookie('token',token,{ expire : new Date() + 9999})

        const { _id ,name , role} = user

        res.json({ token, user : { _id,name,email,role}})

    } catch (e) {
        res.status(400).json({ error : "Email or Password is not correct"})
    }
    
}


exports.isAuthenticated = (req, res,next)=>{

    const checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker)
    {
        return res.status(403).json({ error : "ACCESS DENIED"})
    }
    next();
}

exports.isAdmin=(req ,res,next)=>{ 
    if(req.profile.role === 0)
    {
        return  res.status(403).json({ error : "ACCESS DENIED"})
    }
    next();
}

exports.isSignedIn = expressjwt({ secret : process.env.SECRET , userProperty:'auth'})