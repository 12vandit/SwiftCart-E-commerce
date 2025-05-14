import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from '../AdminHeader';
import SideMenu from '../SideMenu';
import AdminFooter from '../AdminFooter';

export default function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const lineData = location.state.lineData;

  const _id = lineData._id;
  const [f_name, setF_name] = useState(lineData.f_name);
  const [l_name, setL_name] = useState(lineData.l_name);
  const [mobile, setMobile] = useState(lineData.mobile);
  const [email, setEmail] = useState(lineData.email);
  const [photo, setPhoto] = useState(null); // To store new selected photo
  const [ photoPreview,setPhotoPreview] = useState(
    lineData.photo || "http://localhost:3005/default-placeholder.png"
  ); // To preview current or new image

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("f_name", f_name);
    formData.append("l_name", l_name);
    formData.append("mobile", mobile);
    formData.append("email", email);

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const res = await axios.put("http://localhost:3005/updateimage", formData);
      if (res.data.success) {
        toast.success("admin profile update");
        setTimeout(() => navigate("/profile", { replace: true }), 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the user.");
      console.error(error);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl); // Update preview state correctly
    }
  };

  return (
    <>
      <div className="wrapper">
        <AdminHeader />
        <SideMenu />

        <div className="content-wrapper">
          <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
              <div className="col-md-3 border-right">

              </div>
              <div className="col-md-5 border-right">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                  </div>
                  <form className="row g-3 needs-validation" noValidate onSubmit={handleEdit}>
                    <div className="col-md-12">
                      <label className="labels">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter First Name"
                        value={f_name}
                        onChange={(e) => setF_name(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Last Name"
                        value={l_name}
                        onChange={(e) => setL_name(e.target.value)}
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="labels">Mobile Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter phone number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="labels">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        placeholder="Enter Email"
                        accept=".jpeg,.jpg,.png"
                        onChange={handlePhotoChange}
                      />
                    </div>

                    <div className="col-md-12 text-center">
                      <button
                        className="btn btn-primary profile-button mt-3"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdminFooter />
      </div>
    </>
  );
}
