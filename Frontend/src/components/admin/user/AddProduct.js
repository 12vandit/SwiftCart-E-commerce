import React from 'react'
import AdminHeader from '../AdminHeader'
import SideMenu from '../SideMenu'
import AdminFooter from '../AdminFooter'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AddProduct() {

const [categorydata, setCategoryData]=useState([])

  const navigate =  useNavigate()


  const [product_name,setProduct_Name] = useState("");
   const [product_description,setProduct_Description] = useState("");
   const [product_price , setProduct_Price] =  useState("");
   const [product_category,setProduct_Category] = useState("");
   const [product_stock_qutantity,setProduct_Stock_Qutantity] = useState("");
   const [photo,setPhoto] = useState("");



  //  Add User 

  const  handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product_name", product_name);
    formData.append("product_description", product_description);
    formData.append("product_price", product_price);
    formData.append("product_category", product_category);
    formData.append("product_stock_quantity", product_stock_qutantity);
    formData.append("photo", photo);
 
    const res = await axios.post("http://localhost:3005/addproduct",formData);
    console.log("ressssssssss",res.data)
    const msg = res.data.message
    if(res.data.success === true){
      toast.success(msg);
      setTimeout(() => {
        navigate('/product',{replace:true})
      }, 2000);
     
    }
    // else if(res.data.success === false){
    //     console.log("res>>>>",res);
        
    //       toast.error(msg);
    //       return
    // }
    
    else{
      console.log("hellooooooo")
      toast.error(msg);
    }
  }

  const CategoryFind = async ()=>{

    const Url = "http://localhost:3005/find-category"
    const response = await axios.get(Url)
    // console.log("response",response.data.data);
    setCategoryData(response.data.data)
    

   }

   useEffect(()=>{
    CategoryFind()
   })


    return (
        <>
           <div className="wrapper">
                <AdminHeader />
                <SideMenu />
                <div className="content-wrapper p-2">
                    <ToastContainer />
                    <h3> Add product</h3>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-4">
                            <label className="form-label">Product Name*</label>
                            <input required type="text" className="form-control"
                                placeholder=' Enter Product_Name'
                                value={product_name}
                                onChange={(e) => setProduct_Name(e.target.value)} />
                        </div>
                       
                        <div className="col-md-4">
                            <label className="form-label">Product Price*</label>
                            <input required type="number" className="form-control"
                                placeholder="Enter Product_Price"
                                value={product_price}
                                onChange={(e) => setProduct_Price(e.target.value)}
                            />
                        </div>
                        <div class="col-md-3"> 
                            <label class="form-label">Category*</label>
                            <Form.Select  className='form-control'
    value={product_category}
    onChange={(e)=> setProduct_Category(e.target.value)} >
      <option>Open this select menu</option>
      {
        categorydata.map((value,i)=>{
           return(
           <option key={value._id} value={value._id}>{value.category_name}</option>
           )
            })
        
      }
</Form.Select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Stock*</label>
                            <input required type="number" className="form-control"
                                placeholder='Enter Product_Stock_Qutantity'
                                value={product_stock_qutantity}
                                onChange={(e) => setProduct_Stock_Qutantity(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Description*</label>
                            <input required type="text" className="form-control"
                                placeholder=' Enter Product_Description'
                                value={product_description}
                                onChange={(e) => setProduct_Description(e.target.value)} />
                        </div>
                        
                        <div className="col-md-4">
                            <label className="form-label">Product_Image</label>
                            <input type="file" className="form-control"
                                accept='.jpeg , .jpg , .png'
                                onChange={(e) => setPhoto(e.target.files[0])}
                            />
                        </div >
                        <div className="col-12 mt-3 d-flex  justify-content-between align-item-center">

                          <Link to={"/product"}>  <button className="btn btn-danger " type="button" >Cancel</button></Link>
                            <button className="btn btn-success" type="submit">Submit</button>

                        </div>


                    </form>
                </div>
                <AdminFooter />
            </div>
        </>
    )
}