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
export default function AddBanner() {

  const navigate =  useNavigate()


  const [banner_name,setBanner_Name] = useState("");
   const [photo,setPhoto] = useState("");
//   console.log("photo",photo);
  



  //  Add banner 

  const  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("banner_name", banner_name);
   
    formData.append("photo", photo);
  
    const res = await axios.post("http://localhost:3005/addbanner",formData);
    console.log("ressssssssss",res.data)
    const msg = res.data.message
    if(res.data.success === true){
      toast.success(msg);
      setTimeout(() => {
        navigate('/banner',{replace:true})
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
                    <h3> Add Banner</h3>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-4">
                            <label className="form-label">Banner_Name</label>
                            <input required type="text" className="form-control"
                                placeholder=' Enter banner_name'
                                value={banner_name}
                                onChange={(e) => setBanner_Name(e.target.value)} />
                        </div>
                       
                        <div className="col-md-4">
                            <label className="form-label">Banner_Image</label>
                            <input type="file" className="form-control"
                                accept='.jpeg , .jpg , .png'
                                onChange={(e) => setPhoto(e.target.files[0])}
                            />
                        </div >
                        <div className="col-12 mt-3 d-flex  justify-content-between align-item-center">

                           <Link to={"/banner"}> <button className="btn btn-danger " type="button" >Cancel</button></Link>
                            <button className="btn btn-success" type="submit">Submit</button>

                        </div>


                    </form>
                </div>
                <AdminFooter />
            </div>
        </>
    )
}













