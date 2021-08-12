/* eslint-disable array-callback-return */
let cart=[]
export const addItemToCart = (item,next)=>{
if(typeof window !== undefined){
    if(localStorage.getItem("cart")){
        cart=JSON.parse(localStorage.getItem("cart"))
    }
    
    cart.push({
        ...item
    }) 
    localStorage.setItem("cart",JSON.stringify(cart))
    next()
}
}

export const loadCart =()=>{
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }  
    }
}

export const removeItem=(productId)=>{
    // let cart =[]
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product,idx)=>{
            if(product._id ===productId){
                cart.splice(idx,1)
            }
        })
        localStorage.setItem("cart",JSON.stringify(cart))
    }

    return cart;
}

export const  cartEmpty=next=>{
    if(typeof window !== undefined){
        localStorage.removeItem("cart");
        next();
    }
}