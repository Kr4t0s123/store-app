

export const addItemToCart = (item,next)=>{

    let cart = []

    if(typeof window !== undefined)
    {
        if(localStorage.getItem('cart'))
        {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.push(item)
        console.log(cart)
        localStorage.setItem('cart',JSON.stringify(cart))
        next()
    }

}


export const loadCard =()=>{
    if(typeof window !== undefined){
        if(localStorage.getItem('cart'))
        {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }   
}


export const removeItemFromCart =(productId, next)=>{
    let cart = []

    if(typeof window !== undefined )
    {
        cart = JSON.parse(localStorage.getItem('cart'))

        cart.map((product,i)=>{
                if(product._id === productId)
                {
                    cart.splice(i,1);
                }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        next()
    }

}