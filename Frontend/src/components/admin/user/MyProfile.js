import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../AdminHeader';
import SideMenu from '../SideMenu';
import AdminFooter from '../AdminFooter';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export default function User() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    f_name: '',
    l_name: '',
    role_id: '',
    photo: '',
    mobile: '',
    email: '',
  }); // State to store profile data

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const apiUrl = 'http://localhost:3005/view-profile'; // API endpoint
      const response = await axios.get(apiUrl);

      if (response.data.success) {
        // Check if data is returned and set the first user
        const userData = response.data.data[0]; // Assuming you're displaying the first user
        if (userData) {
          setData(userData);
        } else {
          console.warn('No user data available.');
        }
      } else {
        console.error('Error: ', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="wrapper">
        <AdminHeader />
        <SideMenu />

        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
              <div className="col-md-3 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    className="rounded-circle mt-5"
                    width="150px"
                    src={data.photo || 'http://localhost:3005/default-placeholder.png'} // Use dynamic image or fallback
                    alt="Profile"
                    onError={(e) => {
                      e.target.src = 'http://localhost:3005/default-placeholder.png'; // Fallback image
                    }}
                  />
                </div>
              </div>
              <div className="col-md-5 border-right">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label className="labels">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        value={data.f_name || ''}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="labels">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        value={data.l_name || ''}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">Role ID</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Role ID"
                        value={data.role_id || ''}
                        readOnly
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Mobile Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter phone number"
                        value={data.mobile || ''}
                        readOnly
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Email ID</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter email ID"
                        value={data.email || ''}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <Button
                      className="fas fa-edit"
                      type="primary"
                      onClick={() => {
                        navigate('/edit-profile', {
                          state: {
                            lineData: data,
                            _id: data._id,
                          },
                        });
                      }}
                    ></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-header">
            <div className="container-fluid"></div>
          </div>
          <div className="content">
            <div className="container-fluid">
              <div className="row-12"></div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  );
}
