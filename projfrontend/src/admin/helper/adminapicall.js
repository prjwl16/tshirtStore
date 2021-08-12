/* eslint-disable no-unused-vars */
import { API } from "../../backend";    
//Category calls

//create product
export const createCategory= async (userID,token,category)=>{
    // console.log(token,"  ",userID,"  ",JSON.stringify(category));
    
    return fetch(`${API}/category/create/${userID}`,{
        method:"post",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    }) 
    .then(res=>{return res.json()})
    .catch(err=>console.log("error:::",err))
}   

//get All categories
export const getCategories=async ()=>{
    return fetch(`${API}/categories`,{
        method:"get",
    })
    .then(res=>{return res.json()})
    .catch(err=>console.log(err))
}
//product calls
//getAllProduct
export const getProducts=async ()=>{
    return fetch(`${API}/products`,{
        method:"GET",
    })
    .then(res=>{return res.json()})
    .catch(err=>console.log(err))
}

export const createProduct =async (userID,token,product)=>{
    // console.log(res)
    return fetch(`${API}/product/create/${userID}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log("err: ",err))
}

//delete product
export const deleteProduct = async (productID,userID,token)=>{
    
    return fetch(`${API}/product/${productID}/${userID}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(res=>{return res.json()})
    .catch(err=>console.log("error:::",err))
}

//get Product
export const getProduct=async productId=>{
    return fetch(`${API}/product/${productId}`,{
        method:"get"
    })
    .then(
        res=>{
            return res.json()})
    .catch(err=>console.log(err))
}

//update Product
export const updateProduct = async (productID,userID,token,product)=>{

    return fetch(`${API}/product/${productID}/${userID}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then(res=> {return res.json()})
    .catch(err=>console.log("error:::",err))
}

export const deleteCate = async (productID,userID,token,product)=>{
    return fetch(`${API}/category/${productID}/${userID}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(res=>{return res.json()})
    .catch(err=>{console.log(err)})
}