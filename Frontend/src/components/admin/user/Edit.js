import React, { useState } from "react";
import AdminHeader from "../AdminHeader";
import SideMenu from "../SideMenu";
import AdminFooter from "../AdminFooter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";

export default function Edit() {
  const navigate = useNavigate();
  let location = useLocation();
  const lineData = location.state.lineData;
  const _id = lineData._id;

  const [f_name, setF_name] = useState(lineData.f_name);
  const [l_name, setL_name] = useState(lineData.l_name);
  const [dob, setDob] = useState(lineData.dob ? new Date(lineData.dob).toISOString().split("T")[0] : "");
  const [gender, setGender] = useState(lineData.gender);
  const [address, setAddress] = useState(lineData.address);
  const [email, setEmail] = useState(lineData.email);
  const [mobile, setMobile] = useState(lineData.mobile);
  const [photo, setPhoto] = useState("");
  const [existingPhoto, setExistingPhoto] = useState(lineData.photo); // Save existing photo path

  // Edit API
  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("f_name", f_name);
    formData.append("l_name", l_name);
    formData.append("dob", dob);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("mobile", mobile);
    formData.append("gender", gender);

    // Add new photo if selected, otherwise use the existing photo
    if (photo) {
      formData.append("photo", photo);
    } else {
      formData.append("existingPhoto", existingPhoto); // Send existing photo path to the server
    }

    try {
      const res = await axios.put("http://localhost:3005/updateimage", formData);
      const msg = res.data.message;

      if (res.data.success === true) {
        toast.success(msg);
        setTimeout(() => {
          navigate("/user", { replace: true });
        }, 2000);
      } else {
        toast.error(msg);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="wrapper">
        <AdminHeader />
        <SideMenu />
        <div className="content-wrapper p-2">
          <ToastContainer />
          <h3>Edit User</h3>
          <form className="row g-3" onSubmit={handleEdit}>
            <div className="col-md-4">
              <label className="form-label">First Name*</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                value={f_name}
                onChange={(e) => setF_name(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Last Name*</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                value={l_name}
                onChange={(e) => setL_name(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Email*</label>
              <input
                required
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Mobile*</label>
              <input
                required
                type="number"
                className="form-control"
                placeholder="Enter Mobile No"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">DOB*</label>
              <input
                required
                type="date"
                className="form-control"
                placeholder="Enter DOB"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Gender*</label>
              <Form.Select
                className="form-control"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Address</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Profile Image:</label>
              <input
                type="file"
                className="form-control"
                accept=".jpeg,.png,.jpg"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              {/* Show existing photo if no new photo is selected */}
              {existingPhoto && (
                <div style={{ marginTop: "10px" }}>
                 
                </div>
              )}
            </div>
            <div className="col-12 mt-3 d-flex justify-content-between align-items-center">
              <Link to="/user">
                <button className="btn btn-danger" type="button">
                  Cancel
                </button>
              </Link>
              <button className="btn btn-success" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
        <AdminFooter />
      </div>
    </>
  );
}
