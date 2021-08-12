import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import Base from "../core/Base";
import {signin,authenticate,isAuthenticated} from "../auth/helper/index"

const Signin = () => {

    const [values, setValues] = useState({
        email:"user@test.com",
        password:"password",
        error:"",
        loading:false,
        didRedirect:false
})

    const {email,password,error,didRedirect}= values
    const {user} = isAuthenticated();

    const handleChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }
    // const LoadingMessage=()=>{
    //     return(
    //         loading && (
    //             <div className="alert alert-info">
    //                 <h2>Loading...</h2>
    //             </div>
    //         )
    //     )
    // }
    const ErrorMessage=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-center">
                    <div 
                    style={{display:error ? "" :"none"}}   
                    className="alert alert-danger">
                        {error}
                    </div>
                </div>
            </div>
        )
    }
     
    const onSubmit=(event)=>{
        event.preventDefault()
        setValues({...values,error:false,loading:true})
        
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }
            else{
                authenticate(data,()=>{
                    setValues({...values,didRedirect:true})
                })
            }
        })
        .catch(err=>{console.log("signin error: ",err)})
    }
    const performRedirect=()=>{
        if(didRedirect){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    const SignInForm=()=>{
        return (
            <div className="row text-left">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label className="text-light ">Email</label>
                            <input onChange={handleChange("email")}value={email}className="form-control" type="email"/>
                        </div>
                        <div className="form-group pt-3">
                            <label className="text-light ">Password</label>
                            <input onChange={handleChange("password")}value={password}className="form-control" type="password"/>
                        </div>
                        <div className="text-center pt-4">
                            <button onClick={onSubmit}className="btn btn-success btn-block">Sumbit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Base title="sign in page" fcls="lilfooter" >
            {/* {LoadingMessage()} */}
            {ErrorMessage()}
            {SignInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin
