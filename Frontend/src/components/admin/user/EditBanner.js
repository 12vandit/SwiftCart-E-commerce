import React, { useState } from 'react';
import AdminHeader from '../AdminHeader';
import SideMenu from '../SideMenu';
import AdminFooter from '../AdminFooter';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditBanner() {

  const navigate = useNavigate();
  const location = useLocation();
  const lineData = location.state.lineData;

  const _id = lineData._id;

  const [banner_name, setBannerName] = useState(lineData.banner_name);
  const [photo, setPhoto] = useState('');

  // Edit Banner API call
  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("banner_name", banner_name);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const res = await axios.put("http://localhost:3005/updatebanner", formData);

      const msg = res.data.message;

      if (res.data.success === true) {
        toast.success(msg);
        setTimeout(() => {
          navigate('/banner', { replace: true });
        }, 2000);
      } else {
        toast.error(msg);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <>
      <div className="wrapper">
        <AdminHeader />
        <SideMenu />
        <div className="content-wrapper p-2">
          <ToastContainer />
          <h3>Edit Banner</h3>
          <form className="row g-3" onSubmit={handleEdit}>
            {/* Banner Name */}
            <div className="col-md-4">
              <label className="form-label">Banner Name*</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Enter Banner Name"
                value={banner_name}
                onChange={(e) => setBannerName(e.target.value)}
              />
            </div>

            {/* Banner Image */}
            <div className="col-md-4">
              <label className="form-label">Banner Image*</label>
              <input
                type="file"
                className="form-control"
                accept=".jpeg,.jpg,.png"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>

            {/* Cancel and Submit Buttons */}
            <div className="col-12 mt-3 d-flex justify-content-between align-items-center">
              <Link to="/banner">
                <button className="btn btn-danger" type="button">Cancel</button>
              </Link>
              <button className="btn btn-success" type="submit">Submit</button>
            </div>

          </form>
        </div>
        <AdminFooter />
      </div>
    </>
  );
}
