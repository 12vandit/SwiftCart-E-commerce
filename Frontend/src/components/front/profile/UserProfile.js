import React, { useEffect, useState } from 'react';
import HomeHeader from '../HomeHeader';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, message } from 'antd';

export default function UserProfile() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    f_name: '',
    l_name: '',
    role_id: '',
    photo: '',
    mobile: '',
    email: '',
  });
  console.log("data",data.photo);
  

  // console.log("?????????????????????????",data);

  const userId = localStorage.getItem('user_Id');
  useEffect(() => {
    if (!userId) {
      message.error('Yor are not login.');
      navigate('/login');
      return;
    }
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post('http://localhost:3005/userprofile', {
          _id: userId,
        });

        if (response.data.success) {
          setData(response.data.data);
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        message.error('Failed to fetch user profile');
        console.error('Error fetching user profile:', error);
      }
    };


    fetchUserProfile();

  }, [userId, navigate]);

  // Fetch user profile data from the API


  return (
    <div className="wrapper">
      <div style={{background:"white"}}>
      <HomeHeader />
      <div className="content-wrapper">
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                {data.photo && (
                  <img
                    src={data.photo}
                    className="rounded-circle mt-5"
                    width="150px"
                    alt="Profile"
                  />
                )}
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
                      navigate('/edituserprofile', {
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
      </div>
      <Footer />
      </div>
    </div>
  );
}
