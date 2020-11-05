
const { API } = require("../../backend");


//get a category

export const getCategory=(categoryId)=>{
   return fetch(`${API}/category/${categoryId}` , {
       method : "GET"
   }).then((res)=>{
       return res.json()
   }).catch(err=>console.log(err))
}
//Category calls 
export const createCategory =(userId , token, category)=>{
    return fetch(`${API}/category/create/${userId}`,{
        method : "POST",
        headers : {
            Accept : 'application/json',
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body :JSON.stringify(category)
    })  
    .then((data)=>{
        return data.json()
    })
    .catch(error => console.log(error))
}

//get all categories
export const getAllCategories =()=>{
    return fetch(`${API}/categories`,{
        method : "GET"
    })
    .then((res)=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

//updatecateory

export const updateCategory=(categoryId,)=>{

}


//delete category

export const deleteCategory=(categoryId,userId,token)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method : "DELETE",
        headers : {
            Accept : 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then((res)=>{ return res.json()})
    .catch(err => console.log(err))
}


//Product calls

//create a product
export const createProduct =(userId,token,product)=>{
    return( fetch(`${API}/product/create/${userId}`, {
        method : "POST",
        headers : {
            Accept : 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : product
    })
    .then((res)=>{
        return res.json()
    })
    .catch(err => console.log(err))
    );
}

//get all products
export const getProducts =()=>{
    return( fetch(`${API}/products`, {
        method : "GET"
    })
    .then((res)=>{
        return res.json()
    })
    .catch(err => console.log(err))
    );
}

//delete a product

export const deleteProduct=(productId,userId,token)=>{
    return fetch(`${API}/product/${productId}/${userId}`, {
        method : "DELETE",
        headers : {
            Accept : 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
    .then((res)=>{ return res.json()})
    .catch(err => console.log(err))
}

//get a product
export const getProduct =(productId)=>{
    return( fetch(`${API}/product/${productId}`, {
        method : "GET"
    })
    .then((res)=>{
        return res.json()
    })
    .catch(err => console.log(err))
    );
}
//update a product
export const updateProduct=(productId,userId,token,product)=>{

    return fetch(`${API}/product/${productId}/${userId}`,{
        method : "PUT",
        headers :{
            Accept : 'application/json',
            Authorization : `Bearer ${token}`
        },
        body : product
    }).then((res)=>{
        return res.json()
    })
    .catch(err => console.log(err))
}