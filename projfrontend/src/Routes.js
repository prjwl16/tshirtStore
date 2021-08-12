import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Signup from './user/Signup'
import Home from './core/Home'
import Signin from './user/Signin'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import userDashboard from './user/UserDashBoard'
import adminDashboard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import Cart from './core/Cart'


const NotFount=()=>{
    return(
        <div className="NOTFOUND">
            <h1>404 Page Not Found</h1>
        </div>
    )
}

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route ecact path="/signup" component={Signup}/>
                <Route ecact path="/cart" component={Cart}/>
                <Route ecact path="/signin" component={Signin}/>
                <PrivateRoute path="/user/dashboard" exact component={userDashboard}/>
                <AdminRoute path="/admin/dashboard" exact component={adminDashboard} />
                <AdminRoute path="/admin/create/category" exact component={AddCategory} />
                <AdminRoute path="/admin/categories" exact component={ManageCategories} />
                <AdminRoute path="/admin/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/products" exact component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <Route component={NotFount}/>
            </Switch>
        </Router>
    )
}
export default Routes