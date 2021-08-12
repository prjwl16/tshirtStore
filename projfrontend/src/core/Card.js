/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItem } from './helper/Carthelper';
import ImageHelper from './helper/ImageHelper'

const Card = ({product,addToCart=true,removeFromCart=false,setReload=f=>f,reload=undefined}) => {

    const [redirect, setRedirect] = useState(false)
    const cardTitle=product ? product.name : "A photo from pixels"
    const cardDesc=product ? product.description : "Description"
    const cardPrice=product ? product.price : "Price"

    const addToACart=()=>{
        addItemToCart(product,()=>{
            setRedirect(true)
        })
    }

    const getRedirect=()=>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart=(addToCart)=>{
        return (
            addToCart && (
                <button
                onClick={addToACart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                Add to Cart
                </button>
            )
        )
    }
    const showRemoveFromCart=(removeFromCart)=>{
        return ( removeFromCart && (
            <>
                <button
                    onClick={()=>
                        {removeItem(product._id)
                    setReload(!reload)}
                    }
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                    >
                    Remove from cart
                </button>
            </>
        )        )
    }

    return (
        <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
            {/* {getRedirect(redirect)} */}
            <ImageHelper product={product}/>
            <p className="lead bg-success font-weight-normal text-wrap">
            {cardDesc}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
            <div className="row">
            <div className="col-12">
                {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
                {showRemoveFromCart(removeFromCart)}
            </div>
            </div>
        </div>
        </div>
    );
    };

export default Card
