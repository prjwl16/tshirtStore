/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "../styles.css"
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/Carthelper'
import { getProducts } from './helper/coreapicalls'
import StripCheckOut from './helper/StripCheckoutHelper'

const Cart = () => {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])


    const loadAllProducts=()=>{
        return (
            <div className="text-center">
                <h1>Load Prodcuts</h1>
                {products.map((product,idx)=>{
                    return(
                        <Card 
                        key={idx}
                        product={product}
                        addToCart={false}
                        removeFromCart={true}
                        setReload={setReload}
                        reload={reload}
                        />
                        ) 
                })}
            </div>
        )
    }
    const loadCheckOut=()=>{
        return (
            <div className="">
                <h1>Load checkout</h1>
            </div>
        )
    }

    return (
        <Base title="Cart Page" fcls="lilfooter" cname="text-center" desc="Ready to Check Out">
            <div className="row">
                <div className="col-4">{loadAllProducts()}</div>
                <div className="col-5"></div>
                <div className="col-3">
                    <StripCheckOut  products={products} setReload={setReload}/>
                </div>
            </div>
        </Base>
    )
}
export default Cart