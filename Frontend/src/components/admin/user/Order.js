import React, { useState, useEffect } from 'react';
import AdminHeader from '../AdminHeader';
import SideMenu from '../SideMenu';
import AdminFooter from '../AdminFooter';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2 for deletion alerts
import { Button } from 'antd';

export default function Order() {
  const [orderData, setOrderData] = useState([]);
  console.log(">>>>>>>>>>>>>>>>>", orderData);

  // Fetch order data from the API
  const fetchData = async () => {
    try {
      const apiUrl = "http://localhost:3005/orderfind";
      const response = await axios.get(apiUrl);

      if (response.data.success) {
        setOrderData(response.data.data);
      } else {
        console.log("Failed to fetch orders");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // delete order product on dashboard

  const deleteOrder = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = "http://localhost:3005/orderdelete";
        const userData = {
          _id: id
        }
        axios.post(apiUrl, userData)
          .then((response) => {
            console.log(response.data);
            fetchData()
          })

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }


  return (
    <div className="wrapper">
      <AdminHeader />
      <SideMenu />
    
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h3>User Orders</h3>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </div>

        {/* Main content */}
        <div className="content">
          <div className="container-fluid">
            {/* Simple Table */}
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>User Info</th>
                  <th>Order Info</th>
                  <th>Order Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Dynamically render orders */}
                {orderData.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div>Name: {order.userId.f_name}</div>
                      <div>Email: {order.userId.email}</div>
                      <div>Mobile: {order.userId.mobile}</div>
                    </td>
                    <td>
                      <div>Product Name: {order.productId.product_name}</div>
                      <div>Price: ₹{order.productId.product_price}</div>
                    </td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>
                      <Button
            className="fa fa-trash"
            style={{ marginLeft: '2px' }}
            type="primary"
            danger
            onClick={() => deleteOrder(order._id)}
          ></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>{/* /.container-fluid */}
        </div>{/* /.content */}
      </div>
      <AdminFooter />
    </div>
  );
}
