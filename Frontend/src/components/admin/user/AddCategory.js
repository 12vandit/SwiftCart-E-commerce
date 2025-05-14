import React, { useState } from 'react'
import AdminHeader from '../AdminHeader'
import SideMenu from '../SideMenu'
import AdminFooter from '../AdminFooter'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddCategory() {

    const navigate = useNavigate()
    const  [category_name, setCategory_Name] = useState('')
    const [category_description , setCategory_Description] = useState('')
    const [photo,setPhoto] = useState("");

   

    const  handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("category_name", category_name);
        formData.append("category_description", category_description);
      
        formData.append("photo", photo);
     
        const res = await axios.post("http://localhost:3005/add-category",formData);
        console.log("ressssssssss",res.data)
        const msg = res.data.message
        if(res.data.success === true){
          toast.success(msg);
          setTimeout(() => {
            navigate('/category',{replace:true})
          }, 2000);
         
        }
        
        else{
          console.log("hellooooooo")
          toast.error(msg);
        }
      }
                    
    

  return (
    <>
       <div class="wrapper">
                <AdminHeader />
                <SideMenu />
                <div className="content-wrapper">
                <ToastContainer />
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h3 className="m-0">Add Category</h3>
                                </div>{/* /.col */}
                            </div>{/* /.row */}
                        </div>{/* /.container-fluid */}
                    </div>
                    {/* /.content-header */}
                    {/* Main content */}
                    <div className="content">
                        <div className="container-fluid">
                        
                                <form class="row g-3 " onSubmit={handleSubmit}>
                                    <div class="col-md-4">
                                        <label  class="form-label">category Name:</label>
                                        <input type="text" class="form-control"
                                         value={category_name}
                                           onChange={(e) => setCategory_Name(e.target.value)} required />
                                        <div class="valid-feedback">
                                            Looks good!
                                        </div>
                                    </div>
                                    
                                    
                                    <div class="col-md-6">
                                        <label  class="form-label">category Description:</label>
                                        <input value={category_description} onChange={(e) => setCategory_Description(e.target.value)} class="form-control" rows="2"></input>
                                        
                                        <div class="valid-feedback">
                                            Looks good!
                                        </div>
                                        </div>

                                        <div className="col-md-4">
                            <label className="form-label">Product_Image</label>
                            <input type="file" className="form-control"
                                accept='.jpeg , .jpg , .png'
                                onChange={(e) => setPhoto(e.target.files[0])}
                            />
                        </div >

                                        {/* <div class="col-md-4">
                                        <label  class="form-label">Price:</label>
                                        <input type="number" class="form-control" required />
                                        <div class="invalid-feedback">
                                            Please enter the price
                                        </div>
                                    </div> */}
                                    {/* <div class="col-md-4">
                                        <label  class="form-label">createdAt:</label>
                                        <input type="number" class="form-control" required />
                                        <div class="invalid-feedback">
                                            Enter the create time date.
                                        </div>
                                    </div> */}
                                    <div className='col-12 d-flex justify-content-between mt-3'>
                                    
                               <Link to={"/category"}> <button class="btn btn-danger" type="button">Cancel</button></Link>
                                <button class="btn btn-success" type="submit">Submit</button>
                            
                            </div>
                                </form>
                            
                            
                            {/* /.row */}
                        </div>{/* /.container-fluid */}
                    </div>
                    {/* /.content */}
                </div>
                <AdminFooter />
            </div>
    </>
  )
}

