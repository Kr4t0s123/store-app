import React, { useState }from 'react'
import Base from "../core/Base"
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper/index'
const Signup = () => {

    const [values ,setValues] = useState({
        name :"",
        email :"",
        password : "",
        error : "",
        success : false
    })
    
    const handleChange =(name)=>(event )=>{
        setValues({...values,error : false,[name] : event.target.value})
    }

    const onSubmit =(event)=> {
        event.preventDefault();
        setValues({...values,error : false})
        const user = { name,email,password}
        signup(user)
        .then((data)=>{
            if(data.error !== undefined)
            {
                setValues({...values,error : data.error,success: false})
            } else {
                setValues({...values,name:"",password:"",email:"",error:"",success:true})

            }
        })
        .catch(console.log("Error in Signup"))
    }

    const { name , email , password , error ,success } = values
    const SignUpform =()=>{
        return (
            <div className="row shadow-lg p-3 mb-5 bg-white rounded">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-dark">Name</label>
                            <input value={name} type="text" onChange={handleChange('name')} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Email</label>
                            <input value={email} type="email" onChange={handleChange('email')} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Password</label>
                            <input value={password} type="password" onChange={handleChange('password')} className="form-control"/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-dark btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage=()=>{
        return (
            <div className="alert alert-success" style={{display : success ? "":"none"}}>
                New account was created successfully.Please <Link to="/signin">Login here</Link>    
            </div>
        );
    }

    const errorMessage=()=>{
        return (
            <div className="alert alert-danger" style={{ display : error?"":'none'}}>
                {error}
            </div>
        );
    }

    return (
        <Base title="Sign Up page" description="A page for user to sign up!">
             <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                {successMessage()}
                 {errorMessage()}
                 </div>
            </div>
          
            {SignUpform()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup

 
