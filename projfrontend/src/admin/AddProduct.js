/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import {createProduct, getCategories} from "./helper/adminapicall"
const AddProduct = () => {
  const [values, setValues] = useState({
    name:"",
    description:"",
    price:"",
    stock:"",
    photo:"",
    categories:[],
    category:false,
    loading:false,
    error:"",
    createdProduct:"",
    getRedirect:false,
    formData:""
    })
    
    let show=false 
    const {name,price,description,stock,categories,category,loading,error,createdProduct,getRedirect,formData}=values
    const {user,token} = isAuthenticated()
    
    const preload=()=>{
        getCategories().then(data=>{
            if(!data){
                setValues({...values,error:data})
          }else{
                setValues({...values, categories:data, formData:new FormData()})
              }
            })
    }

    useEffect(() => {
        preload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const redirect=()=>{
      console.log(getRedirect)

      if(getRedirect)
      return (
        setTimeout(()=>{
          return <Redirect to="/admin/dashboard" />
        },2000)
        )
    }
    const onSubmit=event=>{
      event.preventDefault()
      setValues({...values,error:"",loading:true})
      createProduct(user._id,token,formData)
      .then(data=>{
        if(data.msg){
          setValues({...values,error:data.msg})
        }else{
          setValues({
            ...values,
            name:"",
            description:"",
            price:"",
            photo:"",
            stock:"",
            loading:true,
            getRedirect:true,
            createdProduct:data.name
          })
          show=true
        }
      })
    }

    const handleChange=name=>event=>{
      const value = name === "photo" ? event.target.files[0] : event.target.value

      formData.set(name,value)
      setValues({...values,[name]:value})
    }

    const successMessage =()=>{
      return (
        <div className="alert alert-success mt-3" style={{display:createdProduct ? "" : "none"}}>
          <h4>{createdProduct} Created Successfully </h4>
        </div>
      )
    }
    const errorMessage =()=>{
      return (
        <div className="alert alert-success mt-3" style={{display:createdProduct ? "none" : ""}}>
          <h4>Something went Wrong, Not able to add product </h4>
        </div>
      )
    }

    const createProductForm = () => (
        <form>
          <span>Upload Image</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select Category</option>
              {
                categories && 
                categories.map((cate,indx)=>(
                  <option key={indx} value={cate._id} >{cate.name}</option>      
                ))
              }
            
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mt-3">
            Create Product
          </button>
        </form>
      );
    
    return (
        <Base title="Add product here" description="Welcome to prodiuct creation section" fcls="" cname="container bg-info p-4">
            <Link to="/admin/dashboard" className="btn btn-md btn-dark text-white rounded mb-3">Admin Home</Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2 mb-3">
                    {show && errorMessage()}
                    {redirect()}
                    {successMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base> 
    )
}
export default AddProduct