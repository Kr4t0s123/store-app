import React , {useState , useEffect}from 'react'
import '../styles.css'
import{ API } from '../backend'
import Base from '../core/Base'
import Card from './Card'
import { getAllProducts } from './helper/coreapicalls'



const Home = () => {
    
    const [products ,setProdcuts] = useState([])
    const [error, setError] = useState(false)
    const loadAllproducts=()=>{
        getAllProducts()
        .then((data)=>{ 
            
            if(data.error){
                setError(data.error)
            } else {
                setProdcuts(data)
            }
        }).catch(err => console.log(err))
    }
    useEffect(()=>{
        loadAllproducts()

    }, [])

    return (
        <Base title="Home Page" description="Welcome to the Tshirt Store">
            <div className="row text-center">
                <h1 className="text-dark">All of Tshirt</h1>

                <div className="row">
                    {products.map((product,index)=>{
                        return (
                        <div key={index} className="col-4 mb-4">
                            <Card product={product}/>
                         </div>
                        );
                    })}
                   
                </div>
            </div>
        </Base>
    )
}

export default Home
