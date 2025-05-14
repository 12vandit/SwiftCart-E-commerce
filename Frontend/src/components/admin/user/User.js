import React, { useEffect, useState } from 'react'
import AdminHeader from '../AdminHeader'
import SideMenu from '../SideMenu'
import AdminFooter from '../AdminFooter'
import Switch from "react-switch";
import { Link , useNavigate} from 'react-router-dom'
import { Button, Result, Table } from 'antd'
import axios from 'axios'
import moment from 'moment';
import { toast } from 'react-toastify';
import { icons } from 'antd/es/image/PreviewGroup'
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
 
export default function User() {
  const navigate = useNavigate()

  const [data,setData] = useState([])
  // console.log("dataa",data);


//search data
const [f_name,setF_Name]= useState("");
const [mobile,setMobile]= useState("");

const [email,setEmail]= useState("");

//clear data
const clearState=()=>{
  setF_Name("");
  setEmail("");
  setMobile("");

  fetchData();
}


const exportToPDF = () => {
  try {
    const doc = new jsPDF();
    const tableData = data.map((item, index) => [
      index + 1,
      item.f_name || 'N/A',
      item.l_name || 'N/A',
      item.email || 'N/A',
      item.mobile || 'N/A',
      item.address || 'N/A',
      moment(item.createdAt).format('DD/MM/YYYY'),
      item.status ? 'Active' : 'Inactive',
    ]);

    // Add a title to the PDF
    doc.text('User Data', 14, 20);

    // Define table columns
    const columns = [
      'S.No',
      'First Name',
      'Last Name',
      'Email',
      'Mobile',
      'Address',
      'Created At',
      'Status',
    ];

    // Generate the table
    doc.autoTable({
      startY: 30,
      head: [columns],
      body: tableData,
    });

    // Save the PDF
    const fileName = 'Users.pdf';
    doc.save(fileName);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
  }
};



  //view api call
  const fetchData = async()=>{
    try {
      const apiUrl = 'http://localhost:3005/viewuser'
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
        const userData={
          _id:id
        }
        axios.post('http://localhost:3005/userdelete',userData)
        .then((response)=>{
          console.log(response.data);
          fetchData()
           })
           Swal.fire("Delete","your user has been deleted","success");
      }
    })
  }

  const handleStatusUpdate = async (id, currentStatus) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon:"warning",
      showCancelButton: true,
      confirmButtonColor:"3085d6",
      confirmButtonColor:"#d33",
      confirmButtonText:"yes, Update it!",
    })
 

    .then(async (result)=>{
      if(result.isConfirmed){
        const body = {
              _id: id,
              status: !currentStatus, 
            };
            try {
            const apiUrl = 'http://localhost:3005/status-update';
    
  
      const response = await axios.post(apiUrl, body);
      console.log(response);
  
      if (response.data.success) {
        // toast.success(response.data.message);
        fetchData(); 
        Swal.fire("Status","status have been update","success");


      } else {
        // toast.error(response.data.message || 'Failed to update status');
      }
    } catch (error) {
      // toast.error('Error updating status');
      console.error(error);
    }
           Swal.fire("Status","your status have been update","success");
      }
    })
  };
  


  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const body = {
        f_name: f_name,
        mobile:  mobile,
        email: email ,
      };
      
      const searchapiUrl = "http://localhost:3005/searchuser"; 
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


 


  const exportToExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(
        data.map((item, index) => ({
          'S.No': index + 1,
          'First Name': item.f_name || 'N/A',
          'Last Name': item.l_name || 'N/A',
          'Email': item.email || 'N/A',
          'Mobile': item.mobile || 'N/A',
          'Address': item.address || 'N/A',
          'Created At': moment(item.createdAt).format('DD/MM/YYYY'),
          'Status': item.status ? 'Active' : 'Inactive',
        }))
      );
  
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
      XLSX.writeFile(workbook, 'Users.xlsx');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  };
  

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Profile',
      dataIndex: "profil",
      render: (text, record) => {
        return record.photo ? (
          <img src={record.photo} alt="profile" style={{ width: '50px', height: '50px' }} />
        ) : (
          <img src='download.png' alt="Default profile" style={{ width: '50px', height: '50px' }} />
        );
      }
    },
    
    {
      title: 'First Name',
      dataIndex: "f_name",
      key: 'f_name',
    },
    {
      title: 'Last Name',
      dataIndex: "l_name",
      key: 'l_name',
    },
    {
      title: 'Email',
      dataIndex: "email",
      key: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: "mobile",
      key: 'mobile',
    },
   
   
    {
      title: 'Address',
      dataIndex: "address",
      render: (text,record) => (
        <div>
          {
          record.address
        }
        </div> 
      ),
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
        <div style={{ display: 'flex' }}>
          <Button
            className="fas fa-edit"
            type="primary"
            onClick={() => {
              navigate('/edituser', {
                state: {
                  lineData: record,
                  _id: record._id,
                },
              });
            }}
          ></Button>
          <Button
            className="fa fa-trash"
            style={{ marginLeft: '2px' }}
            type="primary"
            danger
            onClick={() => {
              handleDelete(record._id);
            }}
          ></Button>
    
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
    },
    
   
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
              <div className="row" style={{ display:"flex", justifyContent: 'space-between',  }}>

                <div>
                  <h3>User</h3>
                </div>
                <div >
                  <Link to={"/adduser"}><button type="button" className="btn btn-primary">Add User</button></Link>
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ marginLeft: '10px' }}
                    onClick={exportToExcel}
                  >
                    Export to Excel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ marginLeft: '10px' }}
                    onClick={exportToPDF}
                  >
                    Export to PDF
                  </button>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </div>
          <div className='d-flex'>
           <div class="col-3  ">
    
    <label  class="form-label">First Name</label>
    <input  type="text" class="form-control" placeholder="First Name"
    value={f_name} 
    onChange={(e) => setF_Name(e.target.value)}
    />
    
  </div>
  <div class="col-3  ">
    <label  class="form-label">Mobile</label>
    <input  type="number" class="form-control" placeholder="Mobile"
    value={mobile}
    onChange={(e) => setMobile(e.target.value)}
    />
    
  </div>
  <div class="col-3">
    <label class="form-label">Email</label>
    <input  type="Email" class="form-control" placeholder="Email" 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />
  </div>
 
 <div className='col-3 p-2'  ><br/>
   <div > 
    <button type="submit" class="btn btn-primary mr-5  "  onClick={handleSearch}>Search</button> 
   <Link class="btn btn-danger " to="/User" role="button" onClick={()=>clearState()}>Clear</Link>
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