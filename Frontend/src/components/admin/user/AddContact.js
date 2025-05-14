import React, { useState } from "react";
import AdminHeader from "../AdminHeader";
import SideMenu from "../SideMenu";
import AdminFooter from "../AdminFooter";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import moment from 'moment'

export default function AddContact() {
  const navigate = useNavigate();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [business_email, setBusiness_email] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3005/addContactUs", {
        first_name: first_name,
        last_name: last_name,
        company: company,
        phone: phone,
        business_email: business_email,
        message: message,
      });
      console.log(response);
      const msg = response.data.message;
      if (response.data.success === true) {
        toast.success(msg);
        setTimeout(() => {
          navigate('/contactus',{replace:true})
        }, 2000);
      } else {
        toast.error(msg);
      }
      // toast.success('Category Added Successfully');
      // navigate('/admin/dashboard')
    } catch (error) {
      // toast.error('Error Occured');
      console.log(error);
    }
  };

  return (
    <>
      <div class="wrapper">
        <AdminHeader />
        <SideMenu />
        <div className="content-wrapper">
          <ToastContainer />
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h3 className="m-0">Add ContactUs</h3>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}
          <div className="content">
            <div className="container-fluid">
              <form class="row g-3 " onSubmit={handleSubmit}>
                
                <div class="col-md-4">
                  <label class="form-label">First Name:</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter First Name"

                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                </div>

                <div class="col-md-4">
                  <label class="form-label">Last Name:</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Last Name"

                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                </div>

                <div class="col-md-4">
                  <label class="form-label">Phone</label>
                  <input
                    required
                    type="number"
                    class="form-control"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div class="col-md-4">
                  <label class="form-label">Business email</label>
                  <input
                    required
                    type="email"
                    class="form-control"
                    placeholder="Enter email"
                    value={business_email}
                    onChange={(e) => setBusiness_email(e.target.value)}
                  />
                </div>

                <div class="col-md-4">
                  <label class="form-label">Company</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    placeholder="Enter Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div class="col-md-4">
                  <label class="form-label">Message</label>
                  <input
                    required
                    type="text"
                    class="form-control"
                    placeholder="Enter Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="col-12 d-flex justify-content-between mt-3">
                
            <Link to={"/contactus"}><button type="button" className="btn btn-danger">Cancel</button></Link>

                  <button class="btn btn-success" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  );
}