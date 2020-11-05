import React from 'react'
import Menu from '../core/Menu'
import '../styles.css'
const Base = ({children , title ="My Title" , description="My description" , className="text-white p-4 MAIN"}) => {
    return (
        <div className="main">
            <Menu />
            <div className="container-fluid">
                <div className="jumbotron text-center shadow p-3 mb-5 bg-white rounded">
                    <h2 className="display-4">{title}</h2>
                     <p className="lead">{description}</p>
                </div>

                 <div className={className}>{children}</div>
            </div>
            <footer className="footer mt-auto py-3 shadow-sm p-3 mb-5 bg-white rounded">
                <div className="container-fluid bg-dark text-white text-center py-3">
                    <h4>If You have got any questions,feel free to reach out !</h4>
                    <button className="btn btn-warning btn-sm">Contact Us</button>
                </div>
                <div className="container">
                    <span className="text-muted">An Amazing place to buy tshirt</span>
                </div>
            </footer>   
        </div>
    )
}
export default Base
