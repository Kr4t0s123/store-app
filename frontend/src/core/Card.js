import React, { useState , useEffect} from 'react'
import Imagehelper from './helper/Imagehelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart ,removeItemFromCart, loadCard } from './helper/Carthelper';

const Card = ({ product,addToCart=true,removeFromCart=false , setProducts }) => {

    const [redirect, setRedirect] = useState(false)

    const getRedirect=()=>{
      if(redirect)
      {
        return <Redirect to="/cart"/>
      }
    }

    const deleteItem =()=>{
      removeItemFromCart(product._id, ()=>{
          setProducts(loadCard())
      })
    }

    const cardTitle = product ? product.name : "A photo from pexels"
    const cardDescrption = product ? product.description: "Default Description"
    const cardPrice = product ? product.price : "-"


    const AddToCart =()=>{
      return (addToCart && 
        <button
        onClick={addtocart}
        className="btn btn-block btn-outline-dark mt-2 mb-2"
      >
        Add to Cart 
      </button>
        );
    }

    const addtocart = ()=>{
      addItemToCart(product , ()=>{
        setRedirect(true)
      })
    }

    const RemoveFromCart =()=>{
      return (removeFromCart && 
        <button
        onClick={deleteItem}
        className="btn btn-block btn-outline-danger mt-2 mb-2"
      >
        Remove from cart
      </button>
        
        );
    }
    
    return (
      <div className="card text-dark shadow-lg p-3 mb-5 bg-white rounded ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
          {getRedirect()}
         <Imagehelper product={product} />
          <p className="lead font-weight-normal text-wrap text-dark">
            {cardDescrption}
          </p>
        
           <p className="btn btn-dark rounded  btn-sm px-4">$ {cardPrice}</p>
          <div className="row">
            <div className="col-12">
              {AddToCart()}
            </div>
            <div className="col-12">
              {RemoveFromCart()}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Card
