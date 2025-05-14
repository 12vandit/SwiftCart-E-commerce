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
export default function Add() {

  const navigate =  useNavigate()


  const [f_name,setF_name] = useState("");
   const [l_name,setL_name] = useState("");
   const [dob , setDob] =  useState("");
   const [email,setEmail] = useState("");
   const [address,setAddress] = useState("");
   const [mobile,setMobile] = useState("");
   const [photo,setPhoto] = useState("");
   const [gender,setGender] = useState("");



  //  Add User 

  const  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("f_name", f_name);
    formData.append("l_name", l_name);
    formData.append("dob", dob);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("mobile", mobile);
    formData.append("photo", photo);
    formData.append("gender", gender);
    const res = await axios.post("http://localhost:3005/adduser",formData);
    console.log("ressssssssss",res.data)
    const msg = res.data.message
    if(res.data.success === true){
      toast.success(msg);
      setTimeout(() => {
        navigate('/user',{replace:true})
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
                            <label className="form-label">First Name*</label>
                            <input required type="text" className="form-control"
                                placeholder=' Enter First_name'
                                value={f_name}
                                onChange={(e) => setF_name(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Last Name*</label>
                            <input required type="text" className="form-control"
                                placeholder=' Enter L_Name'
                                value={l_name}
                                onChange={(e) => setL_name(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Email*</label>
                            <input required type="email" className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Mobile* </label>
                            <input required type="Number" className="form-control"
                                placeholder="Enter mobile no"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Dob*</label>
                            <input required type="date" className="form-control"
                                placeholder='Enter Dob'
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Gender*</label>
                            <Form.Select
                            className='form-control'
                                required
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value={''}>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Address*</label>
                            <input required type="text" className="form-control"
                                placeholder='Enter Address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">User Profile</label>
                            <input type="file" className="form-control"
                                accept='.jpeg , .jpg , .png'
                                onChange={(e) => setPhoto(e.target.files[0])}
                            />
                        </div >
                        <div className="col-12 mt-3 d-flex  justify-content-between align-item-center">

                           <Link to={"/user"}> <button className="btn btn-danger " type="button" >Cancel</button></Link>
                            <button className="btn btn-success" type="submit">Submit</button>

                        </div>


                    </form>
                </div>
                <AdminFooter />
            </div>
        </>
    )
}