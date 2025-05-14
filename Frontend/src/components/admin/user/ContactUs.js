import React, { useEffect, useState } from "react";

import { Table, Button } from "antd";
import axios from "axios";
import { Link,  useNavigate } from "react-router-dom";
import moment from "moment";
import {  toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import AdminHeader from "../AdminHeader";
import SideMenu from "../SideMenu";
import AdminFooter from "../AdminFooter";


export default function ContactUs() {
  
//view
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  // const [CategoryName, setCategoryName] = useState("");
  // const [description, setDescription] = useState("");

  // console.log("data", data);

  //view
  const fetchData = async () => {
    try {
      const apiUrl = 'http://localhost:3005/viewContactUs';
      const response = await axios.get(apiUrl);
      console.log(response.data.data);
      if (response.data.success === true) {
        setData(response.data.data);
        // setAllData(response.data.data)
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);







  //delete
const handleDelete=(id)=>{
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this imaginary file!',
    icon:"warning",
    showCancelButton: true,
    confirmButtonColor:"3085d6",
    confirmButtonColor:"#d33",
    confirmButtonText:"yes, delete it!",
  }).then(async (result)=>{
    if(result.isConfirmed){
      const contactData={
        _id:id
      }
      axios.post('http://localhost:3005/deleteContactUs',contactData)
      .then((response)=>{
        console.log(response.data);
        fetchData()
         })
         Swal.fire("Delete","your contact has been deleted","success");
    }
  })
}


//search
// const clearState = () => {

//   // setDescription("");
//   setCategoryName("");
//   fetchData();
// }


// const handleSearch = async (e) => {
//   e.preventDefault();
//   try {
//     const body = {
//       // _id:_id,
//       CategoryName:CategoryName,
//       // description:  description,  
//     };
     
//     const searchapiUrl = "http://localhost:3002/searchcategory"; 
//     const response = await axios.post(searchapiUrl, body); 
//     console.log(">>>>>>>>>>>>>>>>>>",response);
//     const msg = response.data.message
//     // console.log(msg);
    
//     if (response.data.success === true) {
//       setData(response.data.data);  
//       toast.success(msg);  
//     } else {
//       toast.error(msg);
//     }
//   } catch (error) {
//     console.error('Error during search:', error);
//     toast.error('Something went wrong during search');
//  }
// };






const columns = [
    {
      title: "S.No",
      render: (text, record, index) => index + 1,
    },
   
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "lastname",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Business Email",
      dataIndex: "business_email",
      key: "businessname",
    },
    {
      title: "Created ",
      dataIndex: "createdAt",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
  
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button className="fas fa-edit"
            type="primary"
            onClick={(e) => {
              navigate("/editcontactus", {
                state: {
                  lineData: record,
                  _id: record._id,
                },
              });
            }}
          >
          
          </Button>
          <Button className="fas fa-trash" type="primary" danger onClick={(e)=>{handleDelete(record._id)}}>
          
          </Button>
        </div>
      ),
    },
  ];


  
  return (


<>
<div className="wrapper">
  <AdminHeader />
  <SideMenu />
  <div className="content-wrapper">
    <ToastContainer/>
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>

          <div>
            <h3>Contact</h3>
          </div>
          <div >
            <Link to={"/addcontact"}><button type="button" className="btn btn-primary">Add Contact</button></Link>
          </div>
        </div>
      </div>{/* /.container-fluid */}
    </div>
 
    {/* /.content-header */}
    {/* Main content */}
    <div className="content">
      <div className="container-fluid">
        <div className="row-12">

          <Table dataSource={data} columns={columns} bordered size='small'/>
        </div>
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