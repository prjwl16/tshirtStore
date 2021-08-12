/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../auth/helper'
import { cartEmpty, loadCart } from './Carthelper'
import StripeCheckout from "react-stripe-checkout"
import { API } from '../../backend'

const StripCheckOut = ({products,setReload=f=>f ,reload=undefined}) => {

    const [data, setData] = useState({
        loading:false,
        success:false,
        error:"",
        adrress:""
    })

    if (isAuthenticated()){
        const token =isAuthenticated().token
        const userId =isAuthenticated().user._id
    }

    const getFinalAmount =()=>{
        let amount=0
        products.map((p=>{

            amount+=p.price
        }))
        return amount
    }


    const makePament=(token)=>{
        const body={
            token,
            products
        }
        const headers={
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body:JSON.stringify(body)
        })
        .then(res=>{
            console.log(res)
            // createOrder
        })
        .catch(err=>console.log(err))
    }


    const ShowStripeBtn=()=>{
        return isAuthenticated() ? (
            <StripeCheckout
                stripeKey ="pk_test_51JKoCfSHLnE2edgESmExQE22da2llrBKMbRu07ZrZi4JZioTNYc1Si7UKlNI7IQ963p6eScRRVlyAkU7dMwpv1IW00jxv3ii90"
                token=""
                amount={getFinalAmount()*100}
                name="Buy T-Shirts"
                shippingAddress
                billingAddress   
            >
                <button className="btn btn-success">pay with stripe</button>
            </StripeCheckout>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Sing In</button>
            </Link>
        )
    }

    return (
        <div>
            <h3 className="text-white">{getFinalAmount()}</h3>
            {ShowStripeBtn()}

        </div>
    )
}

export default StripCheckOut
