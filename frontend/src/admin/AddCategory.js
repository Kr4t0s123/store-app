import React,{ useState } from 'react'
import Base from '../core/Base'
import { isAutheticated } from '../auth/helper'
import { Link } from 'react-router-dom'
import { createCategory  } from './helper/adminapicall'
const AddCategory = () => {

    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const {user , token } = isAutheticated()
     
    const goBack=()=>{
        return(
            <div className="mt-5">
                <Link className="btn btn-small btn-dark mb-3" to="/admin/dashboard">Admin Dashboard</Link>
            </div>
        );
    }

    const handlechange =(e)=>{
        setError("")
        setName(e.target.value)
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        setError("")
        setSuccess(false)

        createCategory(user._id,token,{ name }).then(data =>{
            if(data.error)
            {
                setError(true)
            } else {
                setError('')
                setSuccess(true)
                setName('')
            }
        })
      
    }

    const successMessage=()=>{
        if(success)
        {
            return <h4 className="text-success">Category created Successfully</h4>
        }
    }
    const errorMessage=()=>{
        if(error)
        {
            return <h4 className="text-danger">Failed to create Category</h4>
        }
    }
    const myCategoryForm =()=>{
            return (
                <form>
                    <div className="form-group">
                        <p className="lead">Enter the Category</p>
                        <input value={name} onChange={handlechange} type="text" className="form-control mb-3" required autoFocus placeholder="For Ex. Summer"/>
                        <button className="btn btn-outline-dark" onClick={onSubmit}>Create Category</button>
                    </div>
                </form>
            );

    }

    return (
        <Base title="Create a Category here" description="Add new category for new tshirt" className="container bg-dark p-4">
        
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                        {successMessage()}
                        {errorMessage()}
                        {myCategoryForm()}  
                        { goBack()}
                </div>
           
            </div>
        </Base>
    )
}

export default AddCategory
