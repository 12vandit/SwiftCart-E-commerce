import React from 'react'
import AdminHeader from '../AdminHeader'
import SideMenu from '../SideMenu'
import AdminFooter from '../AdminFooter'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddOrder() {

  const navigate =  useNavigate()


  const [userId,setUserId] = useState("");
   const [productId,setProductId] = useState("");
  



  //  Add User 

  const  handleSubmit = async (e) => {
    e.preventDefault();
   
   
    const res = await axios.post("http://localhost:3005/add-to-cart",{userId:userId,productId:productId});
    console.log("ressssssssss",res.data)
    const msg = res.data.message
    if(res.data.success === true){
      toast.success(msg);
      setTimeout(() => {
        navigate('/order',{replace:true})
      }, 2000);
     
    } else{
      console.log("hellooooooo")
      toast.error(msg);
    }
  }

    return (
        <>
           <div className="wrapper">
                <AdminHeader />
                <SideMenu />
                <div className="content-wrapper p-2">
                    <ToastContainer />
                    <h3> Add User</h3>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-4">
                            <label className="form-label">UserID</label>
                            <input required type="text" className="form-control"
                                placeholder=' Enter UserID'
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">ProductID</label>
                            <input required type="text" className="form-control"
                                placeholder=' Enter ProductID'
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)} />
                        </div>
                      
                        <div className="col-12 mt-3 d-flex  justify-content-between align-item-center">

                           <Link to={"/order"}> <button className="btn btn-danger " type="button" >Cancel</button></Link>
                            <button className="btn btn-success" type="submit">Submit</button>

                        </div>


                    </form>
                </div>
                <AdminFooter />
            </div>
        </>
    )
}