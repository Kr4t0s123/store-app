import React , {useState , useEffect}from 'react'
import '../styles.css'
import{ API } from '../backend'
import Base from '../core/Base'
import Card from './Card'
import { getAllProducts } from './helper/coreapicalls'
import { loadCard } from './helper/Carthelper'



const Cart = () => {
    
    const [products ,setProducts] = useState([])


    useEffect(()=>{
        setProducts(loadCard())
    },[])


    const loadAllProducts =()=>{
        return(
            <div>
                 <h1 className="text-dark">Products</h1>
                 {products.map((product,index)=>{
                     return (
                         <Card setProducts={setProducts} key={index} product={product} addToCart={false} removeFromCart={true} />
                     );
                 })}
            </div>
           
        
        );
    }

    const loadCheckOut =()=>{
        return (
            <h1 className="text-dark">Checkout</h1>
        );
    }
    return (
        <Base title="Cart Page" description="Ready Check out">
            <div className="row text-center">
              <div className="col-6">{loadAllProducts()}</div>
              <div className="col-6">{loadCheckOut()}</div>               
            </div>
        </Base>
    )
}

export default Cart
