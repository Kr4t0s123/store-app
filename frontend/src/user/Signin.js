import React, { useState }from 'react'
import Base from "../core/Base"
import { Link , Redirect} from 'react-router-dom'

import { autheticate , signin ,isAutheticated} from '../auth/helper/index'
const Signin = () => {

    const [values,setValues] = useState({
        email : "",
        password : "",
        error : "",
        loading : false,
        didRedirect : false 
    })

    const { email ,password ,error,loading,didRedirect} = values
    const { user } = isAutheticated()  
  
    const handleChange =(name)=>(event)=>{
        setValues({...values,error : false,[name] : event.target.value})
    }

    const onSubmit =(event)=>{
        event.preventDefault()
        const user = { email , password}
        signin(user)
        .then((data)=>{
            if(data.error)
            {
                setValues({...values,error : data.error,loading : false})
            }else {
                  autheticate(data,()=>{
                 setValues({
                    ...values,
                    didRedirect : true
                })
            })}
             
        })
        .catch(console.log("Sign request failed"))
    }

    const performRedirect=()=>{
        if(didRedirect)
        {
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard"/>
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAutheticated())
        {
            return <Redirect to="/"/>
        }
      
    }

    const SignInform =()=>{
        return (
            <div className="row shadow-lg p-3 mb-5 bg-white rounded">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-dark">Email</label>
                            <input onChange={handleChange('email')} type="email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Password</label>
                            <input onChange={handleChange('password')} type="password" className="form-control"/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-dark btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    
    const loadingMessage=()=>{
        return (
            loading && 
                <div className="alert alert-info">
                    <h2>Loading...</h2>
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
        <Base title="Sign In page" description="A page for user to sign in!">
             <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    {errorMessage()}
                    {loadingMessage()}
                </div>
            </div>
            {SignInform()}
            {performRedirect()}
          <p className="text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin

 
