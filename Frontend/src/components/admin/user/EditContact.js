import React from "react";
import AdminHeader from "../AdminHeader";
import SideMenu from "../SideMenu";
import AdminFooter from "../AdminFooter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Form from "react-bootstrap/Form";

export default function EditContact() {
  const navigate = useNavigate();
  let location = useLocation();
  const lineData = location.state.lineData;
//   console.log("location", lineData);
  const _id = location.state.lineData._id;

  const [first_name, setFirst_name] = useState(lineData.first_name);
  const [last_name, setLast_name] = useState(lineData.last_name);
  const [company, setCompany] = useState(lineData.company);
  const [phone, setPhone] = useState(lineData.phone);
  const [business_email, setBusiness_email] = useState(lineData.business_email);
  const [message, setMessage] = useState(lineData.message);

  //  Add User

  const handleEdit = async (e) => {
    e.preventDefault();
    

    const body = {
        _id:_id,
        first_name: first_name,
        last_name: last_name,
        company: company,
        phone: phone,
        business_email: business_email,
        message: message,
    };
    const res = await axios.put("http://localhost:3005/editContactUs", body);
    console.log("ressssssssss", res);
    const msg = res.data.message;
    // console.log("data",body);
    if (res.data.success === true) {
      toast.success(msg);
      // console.log("msg",msg);

      setTimeout(() => {
        navigate("/contactUS", { replace: true });
      }, 2000);
    } else {
      // console.log("hellooooooo");
      toast.error(msg);
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
                  <h3 className="m-0"> Edit ContactUs</h3>
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
              <div className="row">
                <form
                  class="row g-3 needs-validation"
                  novalidate
                  onSubmit={handleEdit}
                >
                <div class="col-md-4">
                  <label class="form-label">First Name:</label>
                  <input
                    type="text"
                    class="form-control"
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


                  <div className=" col-12 d-flex justify-content-between mt-2">
                    <Link to={"/contactUs"}>
                      <button class="btn btn-danger" type="button">
                        Cancel
                      </button>
                    </Link>
                    <button class="btn btn-success" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>

              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content */}
        </div>
        <AdminFooter />
      </div>
    </>
  );
}