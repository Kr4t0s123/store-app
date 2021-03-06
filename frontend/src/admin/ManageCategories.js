import React , {useState , useEffect}from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { getAllCategories ,deleteCategory} from './helper/adminapicall'
import { isAutheticated } from '../auth/helper'


const ManageCategories = () => {

    const [categories, setCategories] = useState([]);

    const { user, token } = isAutheticated();
  
    const preload = () => {
        getAllCategories().then(data => {
          console.log(data)
        if (data.error) {
          console.log(data.error);
        } else {
            setCategories(data);
        }
      });
    };
  
    useEffect(() => {
      preload();
    }, []);

    const deletethisCategory=(categoryId)=>{
      deleteCategory(categoryId,user._id,token).then((data)=>{
        preload()
      }).catch(err => console.log(err))
    }
    return (
        <Base title="Welcome admin" description="Manage Categories here">
        <h2 className="mb-4 text-dark">All products:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-dark my-3">Total 3 products</h2>
  
            {categories && 
            categories.map((category , index)=>(
                <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
               <h3 className="text-dark text-left">{category.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success rounded"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button onClick={() => {deletethisCategory(category._id)}} className="btn btn-danger rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))
            
            }
          </div>
        </div>
      </Base>
    )
}

export default ManageCategories
