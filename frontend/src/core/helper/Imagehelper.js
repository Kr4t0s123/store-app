import React , { useState , useEffect }from 'react'
import { API } from '../../backend'

const Imagehelper = (props) => {
    const { product } = props
    const imageurl = (product ) ? `${API}/product/photo/${product._id}` : 'https://colorlib.com/wp/wp-content/uploads/sites/2/free-bootstrap-ecommerce-templates.png'
    return (
        <div className="rounded p-2">
        <img
          src={imageurl}
          alt="photo"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
          className="mb-3 rounded"
        />
      </div>
    )
}

export default Imagehelper
