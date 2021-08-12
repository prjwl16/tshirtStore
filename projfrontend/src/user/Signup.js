import React, { useState } from 'react'
import Base from "../core/Base";
import {signup} from "../auth/helper/index"
import { Link } from 'react-router-dom';

const Signup = () => {
    const [values,setValues]=useState({
        name:"",
        email:"",
        password:"",
        cpassword:"",
        error:"",
        success: false
    })

    const {name,email,password,error,success,cpassword}= values

    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }

    const SuccessMessage=()=>{
        return(
            <div className="row"> 
                <div className="col-md-6 offset-sm-3 text-center">
                    <div 
                    style={{display:success ? "" :"none"}}   
                    className="alert alert-danger">
                        Account Created Successfully <Link to="/signin">Login Here</Link>
                    </div>
                </div>
            </div>
        )
    }
    const ErrorMessage=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-center">
                    <div 
                    style={
                        {display:error ? "" :"none"}
                    }   
                    className="alert alert-danger">
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const onSubmit=event =>{
        event.preventDefault()
        if(password!==cpassword){
            setValues({...values,error:"Password Do Not Match"})
            ErrorMessage()
        }else{
            setValues({...values,error:false})
            signup({name,email,password,success,error})
                .then(data=>{
                    console.log(data)
                    if(data.error)
                        setValues({...values,error:data.error, success:false})
                    else{
                        setValues({
                            ...values,
                            name:"",
                            email:"",
                            password:"",
                            cpassword:"",
                            success:true
                        })
                    }
                    })
                .catch(err=>console.log("Error on signup",err))
        }
}

    const SignupForm=()=>{
        return (
            <div className="row text-left">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" value={name} onChange={handleChange("name")} type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light ">Email</label>
                            <input className="form-control" value={email} onChange={handleChange("email")} type="email"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light ">Password</label>
                            <input className="form-control" value={password} onChange={handleChange("password")} type="password"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light ">Confirm Password</label>
                            <input className="form-control" value={cpassword} onChange={handleChange("cpassword")} type="password"/>
                        </div>
                        <div className="text-center pt-4">
                            <button onClick={onSubmit} className="btn btn-success btn-block">Sumbit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="sign up page" fcls="footer">
            {SuccessMessage()}
            {ErrorMessage()}
            {SignupForm()}
            {SignupForm()}  

        </Base>
    )
}

export default Signup
