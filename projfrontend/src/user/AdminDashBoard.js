import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper/index'
import Base from "../core/Base"


const AdminDashBoard = () => {
    const {user:{name,email}}=isAuthenticated()

    const adminLeftSide=()=>{
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white text-center">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-center text-info">Create Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-center text-info">Manage Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-center text-info">Create Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-center text-info">Manage Prodcuts</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/order" className="nav-link text-center text-info">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const  adminRightSide=()=>{
        return(
            <div className="card mb-4">
                    <ul className="list-group display-6 p-3 text-center">Admin Information</ul>
                <h4 className="card-header">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <span className="bg-dark badge badge-pill mr-2">
                                Name: 
                            </span>                           
                                {"   "+name}
                        </li>
                        <li className="list-group-item">
                            <span className="bg-dark badge badge-pill mr-2">
                                Email:
                            </span>
                                {"    "+email}
                        </li> 
                    </ul>
                    <ul className="list-group bg-danger display-6 p-3 text-center">Admin Area</ul>
                </h4>

            </div>
        )
    }
    return (
        <Base fcls="lilfooter" title="Welcom To Admin Area" cname="container bg-secondary p-4" desc="Manage all your poducts here..!!!">
            <div className="row">
                <div className="col-3">{adminLeftSide()}</div>
                <div className="col-9">{adminRightSide()}</div>
            </div>

        </Base>
    )
}

export default AdminDashBoard
