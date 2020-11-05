import React from 'react'
import Base from '../core/Base'
import { isAutheticated } from '../auth/helper'
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {

    const { user } = isAutheticated();
    const { name , email, role} = user
    
    const adminleftside =()=>{
        return (
            <div className="card">
                <h4 className="card-header text-dark">Admin navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/create/category">Craete a category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/categories">Manage categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/create/product">Craete a product</Link>
                    </li>
                     <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        );
    }

    const adminrightside =()=>{
        return (
            <div className="card mb-4">
                <h4 className="text-dark card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-dark mr-2">Name:</span>Sankalp
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-dark mr-2">Email:</span>Sankalp
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger mr-2">Admin area</span>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <Base title="Welcome To Admin Area" description="Manage all of your Products here" className="container bg-dark p-4">
            <div className="row">
                <div className="col-3"> {adminleftside()}</div>
                <div className="col-9">{adminrightside()}</div>
            </div>
        </Base>
    )
}
export default AdminDashBoard

