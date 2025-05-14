import React, { useState } from "react";
import AdminHeader from "../AdminHeader";
import SideMenu from "../SideMenu";
import AdminFooter from "../AdminFooter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditCategory() {
  const navigate = useNavigate();
  const location = useLocation();
  const lineData = location.state.lineData;

  const _id = lineData._id;
  const [category_name, setCategoryName] = useState(lineData.category_name);
  const [category_description, setCategoryDescription] = useState(lineData.category_description);
  const [photo, setPhoto] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState(lineData.photo);

  // Handle Edit Category
  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("category_name", category_name);
    formData.append("category_description", category_description);

    if (photo) {
      formData.append("photo", photo);
    } else {
      formData.append("existingPhoto", existingPhoto);
    }

    try {
      const res = await axios.put("http://localhost:3005/updatecategory", formData);
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => navigate("/category", { replace: true }), 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while updating the category");
    }
  };

  return (
    <>
      <div className="wrapper">
        <AdminHeader />
        <SideMenu />
        <div className="content-wrapper p-2">
          <ToastContainer />
          <h3>Edit Category</h3>
          <form className="row g-3" onSubmit={handleEdit}>
            {/* Category Name */}
            <div className="col-md-4">
              <label className="form-label">Category Name*</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Enter category name"
                value={category_name}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            {/* Category Description */}
            <div className="col-md-4">
              <label className="form-label">Category Description*</label>
              <textarea
                required
                className="form-control"
                placeholder="Enter category description"
                value={category_description}
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
            </div>

            {/* Category Image */}
            <div className="col-md-4">
              <label className="form-label">Category Image:</label>
              <input
                type="file"
                className="form-control"
                accept=".jpeg,.png,.jpg"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              {existingPhoto && (
                <div style={{ marginTop: "10px" }}>
                  {/* <img
                    src={existingPhoto}
                    alt="Category"
                    style={{ width: "100px", height: "100px", borderRadius: "8px" }}
                  /> */}
                </div>
              )}
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="col-12 mt-3 d-flex justify-content-between align-items-center">
              <Link to="/category">
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
