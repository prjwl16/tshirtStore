import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { deleteCate, getCategories} from "./helper/adminapicall"

const ManageCate = () => {
  const [cate, setCate] = useState([])

  const {user,token} = isAuthenticated()

  const preload =()=>{
    getCategories().then(data=>{
      if(!data){
        console.log(data)
      }else{
        setCate(data)
      }
    })
  }
  useEffect(() => {
    preload()
  }, [])

  const deleteThisCate = cateId=>{
    deleteCate(cateId,user._id,token).then(data=>{
      if(!data){
        console.log(data)
      }else{
        preload()
      }
    })
  }
    return (
        <Base title="Welcome admin" fcls="lilfooter" desc="Manage categories here">
          <h2 className="mb-4 text-white">All Categories</h2>
          <Link className="btn btn-info" to={`/admin/dashboard`}>
            <span className="">Admin Home</span>
          </Link>
          <div className="row">
            <div className="col-12">
              <h2 className="text-center text-white my-3">ALL categories</h2>
                {
                  cate.map((cat,idx)=>{
                    return(
                      <div key={idx} className="row text-center mb-2 ">
                        <div className="col-6">
                          <h3 className="text-white text-left">{cat.name}</h3>
                        </div>
                        <div className="col-6">
                          <button onClick={() => {
                            deleteThisCate(cat._id)
                          }} className="btn btn-danger">
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  })
                }
            </div>
          </div>
          <div className="col">
              {/* <div className="col-3"> */}
                <Link className="btn btn-info text-center" to={`/admin/create/category`}>
                    <span className="">Create New Category</span>
                </Link>
              {/* </div> */}
          </div>
        </Base>
    )
}
export default ManageCate