import React, { useEffect, useState } from 'react'
import AdminHeader from '../AdminHeader'
import SideMenu from '../SideMenu'
import AdminFooter from '../AdminFooter'
import { Link , useNavigate} from 'react-router-dom'
import { Button, Result, Table } from 'antd'
import axios from 'axios'
import moment from 'moment';
import { toast } from 'react-toastify';
import { icons } from 'antd/es/image/PreviewGroup'
import Swal from 'sweetalert2'
import Switch from "react-switch";

export default function Banner() {
  const navigate = useNavigate()

  const [data,setData] = useState([])
  // console.log("dataa",data);


//search data
const [banner_name,setBanner_Name]= useState("");




//clear data
const clearState=()=>{
  setBanner_Name("");
 
  fetchData();
}



  //view api call
  const fetchData = async()=>{
    try {
      const apiUrl = 'http://localhost:3005/viewbanner'
      const response  = await axios.get(apiUrl)
      // console.log("-------",response);
      if (response.data.success === true) {
        setData(response.data.data)
      
      } else {
        console.log("Error: ", response.data.message);

      }
    } catch (error) {
      console.log("error fetching users",error);

    }
  }
  useEffect(()=>{
    fetchData()
  },[])


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
        const bannerData={
          _id:id
        }
        axios.post('http://localhost:3005/deletebanner',bannerData)
        .then((response)=>{
          console.log(response.data);
          fetchData()
           })
           Swal.fire("Delete","your user has been deleted","success");
      }
    })
  }


  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const body = {
        banner_name: banner_name,
              
      };
      
      const searchapiUrl = "http://localhost:3005/searchbanner"; 
      const response = await axios.post(searchapiUrl, body); 
      console.log("ress",response);
      const msg = response.data.message
      // console.log(msg);
      
      if (response.data.success === true) {
        setData(response.data.data);  
        toast.success(msg);  
      } else {
        toast.error(msg);
      }
    } catch (error) {
      console.error('Error during search:', error);
      toast.error('Something went wrong during search');
   }
  };


  const handleStatusUpdate = async (id, currentStatus) => {
     Swal.fire({
         title: 'Are you sure?',
         text: 'You will not be able to recover this imaginary file!',
         icon:"warning",
         showCancelButton: true,
         confirmButtonColor:"3085d6",
         confirmButtonColor:"#d33",
         confirmButtonText:"yes, Update it!",
       }).then(async (result) => {
      if (result.isConfirmed) {
        const body = {
          _id: id,
          status: !currentStatus, // Toggle status
        };
        try {
          const apiUrl = 'http://localhost:3005/status-update';
          const response = await axios.put(apiUrl, body);
  
          if (response.data.success) {
            fetchData(); // Refresh the data to reflect the updated status
            Swal.fire("Success", "Status has been updated", "success");
          } else {
            Swal.fire("Error", "Something went wrong", "error");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Unable to update status", "error");
        }
      }
    });
  };
  

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Banner_Image',
      dataIndex: "banner_image",
      render: (text, record) => {
       
        // console.log(">>>>>>>>>>",record);
        return  (
          <img src={record.photo} alt="Banner" style={{ width: '50px', height: '50px' }} />
        ) 
      }
    },
    {
      title: 'Banner_Name',
      dataIndex: "banner_name",
      key: 'banner_name',
    },
  
    {
      title: 'Createdat',
      dataIndex: 'createdAt',
      render: (text) => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div style={{display:'flex'}}>
         <Button className='fas fa-edit' type='primary' onClick={(e)=> {
            navigate("/editbanner", {
              state :{
                lineData : record,
                _id : record._id
              }
            })
          }}></Button>
          <Button className="fa fa-trash" style={{marginLeft:'2px'}} type='primary' danger onClick={()=>{handleDelete(record._id)}} ></Button>
          <div  style={{marginLeft:'5px',marginTop:"5px"}}>
          <Switch
            checked={record.status} // Reflect the current status
            onChange={() => handleStatusUpdate(record._id, record.status)}
            offColor="#888"
            onColor="#4caf50"
            offHandleColor="#fff"
            onHandleColor="#fff"
           
            height={20}
            width={40}
          />
          </div>
        </div>
      ),
    }
   
  ]

  return (
    <>
      <div className="wrapper">
        <AdminHeader />
        <SideMenu />
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>

                <div>
                  <h3>Banner</h3>
                </div>
                <div >
                  <Link to={"/addbanner"}><button type="button" className="btn btn-primary">Add Banner</button></Link>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </div>
          <div className='d-flex'>
           <div class="col-3  ">
    
    <label  class="form-label">Banner_Name</label>
    <input  type="text" class="form-control" placeholder="Banner Name"
    value={banner_name} 
    onChange={(e) => setBanner_Name(e.target.value)}
    />
    
  </div>
 
 <div className='col-3 p-2'  ><br/>
   <div > 
    <button type="submit" class="btn btn-primary mr-5  "  onClick={handleSearch}>Search</button> 
   <Link class="btn btn-danger " to="/banner" role="button" onClick={()=>clearState()}>Clear</Link>
  </div>
  </div>
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


