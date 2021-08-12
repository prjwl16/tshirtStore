/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { createCategory } from './helper/adminapicall'

const AddCategory = () => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {token,user} = isAuthenticated()
    const id=user._id
    const goBack=()=>{
        return(
            <div className="mt-5 ml-2">
                <Link to="/admin/dashboard" className="btn btn-success btn-sm mb-3">Admin Home</Link>
            </div>
        )
    }

    const successMessage=()=>{
        if(success){
            return(
                <h4 className= "text-success">Category Created Successfully</h4>
            )
        }
    }
    const errorMessage=()=>{
        if(error){
            return(
                    <h4 className= "text-danger">Failed to create Category</h4>
            )
        }
    }

    const handleChange=event=>{
        setError("")
        setName(event.target.value)
    }
    const handleSubmit =event=>{
        event.preventDefault()

        setError("")
        setSuccess(false)
        
        createCategory(id,token,{name})
        .then(data=>{
            if(data.error) setError(true)
            else{
                setError("")
                setSuccess(true)
                setName("")
            }
        })
        .catch(err=>(err ? console.log("Handle"+err) : false))
    }

    const myCategoryForm=()=>{
        return(
        <form action="">
            
            <div className="form-group m-2">
                <p className="lead text-center">Enter the category</p>
                <input type="text" autoFocus required placeholder="eg: Summer" onChange={handleChange} value={name}className="form-control my-3" />
                <button className="btn btn-info" onClick={handleSubmit}>Create Category</button>
            </div>
        </form>)
    }

    return (
        <Base title="create category here" fcls="lilfooter" desc="add a new category for new tshirts" cname="bg-info rounded container p-4">
            <div className="bg-white rounded row">
                    <div className="col-md-8 offset-md-2">
                    {myCategoryForm()}
                    {successMessage()}
                    {errorMessage()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory