/* eslint-disable no-restricted-globals */
import React from 'react'
import {Link ,withRouter} from "react-router-dom"
import { signout,isAuthenticated } from '../auth/helper/index'


const currentTab=(location,path)=>{
    if(location.pathname===path){
        return {color: "#2eec72",cursor:"pointer"}
    }
    return {color:"#FFFFFF"}
}

const Menu = ({history}) => {
    
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">   <Link to="/" style={currentTab(location,"/")} className="nav-link">Home</Link>  </li>
                <li className="nav-item">   <Link to="/cart" style={currentTab(location,"/cart")} className="nav-link">Cart</Link>  </li>
                {
                isAuthenticated() && isAuthenticated().user.role===1  ?
                <> 
                    <li className="nav-item">   <Link to="/user/dashboard" style={currentTab(location,"/user/dashboard")} className="nav-link">User DashBoard</Link></li>
                    <li className="nav-item">   <Link to="/admin/dashboard" style={currentTab(location,"/admin/dashboard")} className="nav-link">Admin DashBoard</Link>  </li>
                </>
                :
                <li className="nav-item">   <Link to="/user/dashboard" style={currentTab(location,"/user/dashboard")} className="nav-link">DashBoard</Link>  </li>
            }
                {
                isAuthenticated()   ?
                (
                    <li style={{cursor:"pointer"}} className="nav-item">
                        <span className="nav-link text-muted" onClick={()=>{
                            signout(()=>{                                                             
                                history.push("/")
                            })
                        }} >Sign Out</span>
                    </li>
                )
                :
                <>
                    <li className="nav-item">   <Link to="/signin" style={currentTab(location,"/signin")} className="nav-link">Sign In</Link></li>
                    <li className="nav-item">   <Link to="/signup" style={currentTab(location,"/signup")} className="nav-link">Sign Up</Link>  </li>
                </>
            }
            </ul>
        </div>
    )
}

export default withRouter(Menu)
