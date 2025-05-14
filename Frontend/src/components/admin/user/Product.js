import React, { useEffect, useState } from 'react'
import AdminHeader from '../AdminHeader'
import Form from "react-bootstrap/Form";
import Switch from "react-switch";
import SideMenu from '../SideMenu'
import AdminFooter from '../AdminFooter'
import { Link , useNavigate} from 'react-router-dom'
import { Button, Result, Table } from 'antd'
import axios from 'axios'
import moment from 'moment';
import { toast } from 'react-toastify';
import { icons } from 'antd/es/image/PreviewGroup'
import Swal from 'sweetalert2'
import * as XLSX from 'xlsx'; 
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Product() {
  const navigate = useNavigate()
  const [categorydata, setCategoryData]=useState([])
 console.log(">>>>>>",categorydata);
 


  const [data,setData] = useState([])
  // console.log("dataa",data);


//search data
const [product_name,setProduct_Name]= useState("");
const [product_category,setProduct_Category]= useState("");


//clear data
const clearState=()=>{
  setProduct_Name("");
  setProduct_Category("");
  fetchData();
}



  //view api call
  const fetchData = async()=>{
    try {
      const apiUrl = 'http://localhost:3005/viewproduct'
      const response  = await axios.get(apiUrl)
      console.log("-------",response.data.data);
      if (response.data.success === true) {
        setData(response.data.data)
      
      } else {
        console.log("Error: ", response.data.message);

      }
    } catch (error) {
      console.log("error fetching users",error);

    }
  }
 
 

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
        const productData={
          _id:id
        }
        axios.post('http://localhost:3005/deleteproduct',productData)
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
        product_name: product_name , 
        product_category: product_category , 
      };
  
      const searchapiUrl = "http://localhost:3005/searchproduct";
      const response = await axios.post(searchapiUrl, body);
      // console.log("Response:", response);
      const msg = response.data.message;
  
      if (response.data.success === true) {
        setData(response.data.data);
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    } catch (error) {
      console.error("Error during search:", error);
      toast.error("Something went wrong during search");
    }
  };
  

  const CategoryFind = async ()=>{

    const Url = "http://localhost:3005/find-category"
    const response = await axios.get(Url)
    // console.log("response",response.data.data);
    setCategoryData(response.data.data)
    

   }
  
  // Call this function in useEffect to load category data
  useEffect(() => {
    CategoryFind();
    fetchData();
  }, []);
  

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
              status: !currentStatus, // Toggle status
            };
            try {
            const apiUrl = 'http://localhost:3005/status-productupdate';
    
  
      const response = await axios.post(apiUrl, body);
      console.log(response);
  
      if (response.data.success) {
        fetchData(); // Refresh the data to reflect the updated status
        Swal.fire("Status"," status have been update","success");


      } else {
      }
    } catch (error) {
      console.error(error);
    }
           Swal.fire("Status"," status have been update","success");
      }
    })
  };

  // Export to Excel
  const exportToExcel = () => {
    const excelData = data.map((item, index) => ({
      "S.No": index + 1,
      "Product Name": item.product_name,
      "Product Price": item.product_price,
      "Product Category": item.product_category?.category_name || "N/A",
      "Stock Quantity": item.product_stock_quantity,
      "Created At": moment(item.createdAt).format('DD/MM/YYYY'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "ProductData.xlsx");
  };   

  

  // Handle export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "S.No",
      "Product Name",
      "Price",
      "Category",
      "Stock Quantity",
      "Created At",
    ];
    const tableRows = [];

    data.forEach((item, index) => {
      const rowData = [
        index + 1,
        item.product_name,
        item.product_price,
        item.product_category.category_name,
        item.product_stock_quantity,
        moment(item.createdAt).format('DD/MM/YYYY'),
      ];
      tableRows.push(rowData);
    });

    doc.text("Product List", 14, 10);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("ProductList.pdf");
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Product_Image',
      dataIndex: "profil",
      render: (text, record) => {
        return record.photo ? (
          <img src={record.photo} alt="Product" style={{ width: '50px', height: '50px' }} />
        ) : (
          <img src='download.png' alt="Default Product" style={{ width: '50px', height: '50px' }} />
        );
      }
    },
    {
      title: 'Product_Name',
      dataIndex: "product_name",
      key: 'product_name',
    },
   
    {
      title: 'Product_Price',
      dataIndex: "product_price",
      key: 'product_price',
    },
    {
      title: 'Product_Category',
      dataIndex: "product_category",
      render:(record)=>{
        // console.log(">>>>>>>",record.category_name);
        
        return record.category_name  ? record.category_name:'N/A'     
      }
    },
   
   
    {
      title: 'Product_Stock_Quantity',
      dataIndex: "product_stock_quantity",
     key:"product_stock_quantity "
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
            navigate("/editproduct", {
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
                  <h3>Product</h3>
                </div>
                <div >
                  <Link to={"/addproduct"}><button type="button" className="btn btn-primary">Add Product</button></Link>
                  <button type="button" className="btn btn-success ml-2" onClick={exportToExcel}>Export to Excel</button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ marginLeft: '10px' }}
                    onClick={handleExportPDF}
                  >
                    Export to PDF
                  </button>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </div>
          <div className='d-flex'>
           <div class="col-3  ">
    
    <label  class="form-label">Product Name</label>
    <input  type="text" class="form-control" placeholder="Product Name"
    value={product_name} 
    onChange={(e) => setProduct_Name(e.target.value)}
    />
    
  </div>
  <div class="col-md-3"> 
                            <label class="form-label"> Product Category</label>
                            <Form.Select
  className="form-control"
  value={product_category}
  onChange={(e) => setProduct_Category(e.target.value)}
>
  <option value="">Select a Category</option>
  {categorydata.map((value) => (
    <option key={value._id} value={value._id}>
      {value.category_name}
    </option>
  ))}
</Form.Select>

                        </div> 
 
 <div className='col-3 p-2'  ><br/>
   <div > 
    <button type="submit" class="btn btn-primary mr-5  "  onClick={handleSearch}>Search</button> 
   <Link class="btn btn-danger " to="/product" role="button" onClick={()=>clearState()}>Clear</Link>
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


