/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import {getCategories, getProduct,updateProduct} from "./helper/adminapicall"
const UpdateProduct = ({match}) => {
    const {user,token} = isAuthenticated()

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
    
    const preload=(productId)=>{
        getProduct(productId).then(data=>{
            if(!data){
                setValues({...values,error:data.error})
          }else{
              preloadCategories()
              setValues({...values,
                name:data.name,
                description:data.description,
                category:data.category._id,
                price:data.price,
                stock:data.stock,
                formdata: new FormData(),
            })
            }
        })
    }
    
    const preloadCategories=()=>{
        getCategories().then(data => {
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    categories: data,
                    formData: new FormData()
                })
            }
        })
    }
    
    useEffect(() => {
        preload(match.params.productId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const redirect=()=>{
      if(getRedirect)
      return (
        setTimeout(()=>{
          return <Redirect to="/admin/dashboard" />
        },2000)
        )
    }
    
    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
    
        updateProduct(match.params.productId, user._id, token, formData).then(
          data => {
            if (data.error) {
              setValues({ ...values, error: data.error });
            } else {
              setValues({
                ...values,
                name: "",
                description: "",
                price: "",
                photo: "",
                stock: "",
                loading: false,
                createdProduct: data.name
              });
            }
          }
        );
      };
    // console.log("for",name)
    
    const successMessage =()=>{
        return (
            <div className="alert alert-success mt-3" style={{display:createdProduct ? "" : "none"}}>
          <h4>{createdProduct} Updated Successfully </h4>
        </div>
      )
    }
    const handleChange = name => event => {
        // console.log(name,"naem")
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
      };
    const errorMessage =()=>{
      return (
        <div className="alert alert-success mt-3" style={{display:createdProduct ? "none" : ""}}>
          <h4>Something went Wrong, Not able to add product </h4>
        </div>
      )
    }

    const createProductForm = () => (
        <form>
          <span>Post photo</span>
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
              <option>Select</option>
            {
              categories &&
                categories.map((cate, index) => {
                    return (
                        <option key={index} value={cate._id}>
                            {cate.name}
                        </option>
                    ) 
                })
            }
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
            />
          </div>
    
          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-outline-success mb-3"
          >
            Update Product
          </button>
        </form>
      );
    
    return (
        <Base title="Add product here" description="Welcome to prodiuct creation section" fcls="" cname="container bg-info p-4">
            <Link to="/admin/dashboard" className="btn btn-md btn-dark text-white rounded mb-3">Admin Home</Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2 mb-3">
                    {/* {show && errorMessage()} */}
                    {/* {redirect()} */}
                    {successMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base> 
    )
}
export default UpdateProduct