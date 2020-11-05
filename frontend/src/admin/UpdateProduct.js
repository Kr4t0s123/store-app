import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllCategories, updateProduct , getProduct} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper";



const UpdateProduct = ({match}) => {
  const { user , token } = isAutheticated()
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo : "",
    categories  : [],
    category : "",
    loading : false,
    error : "",
    updatedProduct : "",
    getRedirect : false,
    formdata : ""
  });

  const { name, description, price, stock , categories ,category,loading,error ,updatedProduct ,getRedirect,formdata} = values;
  const preLoad =(productId)=>{
    //   console.log(match.params.productId)
   
        getProduct(productId)
        .then((data)=>{
            console.log(data)
            if(data.error){
                setValues({...values,error : data.error})
            } else {
                  setValues({...values,
                name : data.name,
                description : data.description,
                price : data.price,
                category : data.category._id,
                stock : data.stock,
                formdata : new FormData()
                })
                preload2()
            }
        })
        .catch(err => console.log(err))
  }

  const preload2=()=>{
    getAllCategories().then((data)=>{
        console.log(data)
      if(data.error){
          setValues({...values,error : data.error})
      } else {
              setValues({categories : data, formdata : new FormData() })
             
      }
  }).catch(err => console.log(err)) 


  }

  useEffect(()=>{
      preLoad(match.params.productId)
  },[])
  const onSubmit = (event) => {
    //
    event.preventDefault()
    setValues({...values,error :"",loading : true})
    updateProduct(match.params.productId, user._id,token,formdata)
    .then((data)=>{
        if(data.error){
            setValues({...values,error : data.error})
        } else {
            setValues({...values,
            name : "",
            description : "",
            price :"",
            photo: "",
            stock : "",
            loading : false,
            updatedProduct : data.name
            })
        }
    })
    .catch(err => console.log(err))
  };

  const successMessage=()=>(
      <div className="alert alert-info mt-3" style={{display : updatedProduct ? "" : 'none'}}>
          <h4>updated successfully</h4>
      </div>    
  )

  const errorMessage=()=>(
    <div className="alert alert-danger mt-3" style={{display : error ? "" : 'none'}}>
    <h4>Falied to update Product</h4>
</div>)    


  const handleChange = name => event => {
    //
    if(name === 'photo'){
        setValues({...values,[name] : event.target.files[0]})
    } else {
        formdata.set(name , event.target.value)
        setValues({...values,[name] : event.target.value})
    }
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-info">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories && 
            categories.map((category ,index)=>(
                 <option key={index} value={category._id}>{category.name}</option>
            ))
          }
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-info mb-3"
      >
       Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-dark p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark btn-outline-info mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}        
          {createProductForm()}</div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
