import React, { useState, useEffect } from "react";
import AdminHeader from "../AdminHeader";
import SideMenu from "../SideMenu";
import AdminFooter from "../AdminFooter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const lineData = location.state.lineData;

  const _id = lineData._id;

  const [product_name, setProductName] = useState(lineData.product_name);
  const [product_price, setProductPrice] = useState(lineData.product_price);
  const [product_description, setProductDescription] = useState(lineData.product_description);
  const [product_category, setProductCategory] = useState(lineData.product_category._id);
  const [product_stock_quantity, setProductStockQuantity] = useState(lineData.product_stock_quantity);
  const [photo, setPhoto] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState(lineData.photo);
  const [categoryData, setCategoryData] = useState([]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3005/find-category");
      setCategoryData(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle Edit
  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("product_name", product_name);
    formData.append("product_price", product_price);
    formData.append("product_description", product_description);
    formData.append("product_category", product_category);
    formData.append("product_stock_quantity", product_stock_quantity);

    if (photo) {
      formData.append("photo", photo);
    } else {
      formData.append("existingPhoto", existingPhoto);
    }

    try {
      const res = await axios.put("http://localhost:3005/updateproductimage", formData);
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => navigate("/product", { replace: true }), 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while updating the product");
    }
  };

  return (
    <>
      <div className="wrapper">
        <AdminHeader />
        <SideMenu />
        <div className="content-wrapper">
          <ToastContainer />
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h3 className="m-0">Edit Product</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="container-fluid">
              <form className="row g-3 needs-validation" onSubmit={handleEdit}>
                <div className="col-md-4">
                  <label className="form-label">Product Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Product Name"
                    required
                    value={product_name}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Product Price*</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    required
                    value={product_price}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Category*</label>
                  <Form.Select
                    className="form-control"
                    required
                    value={product_category}
                    onChange={(e) => setProductCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categoryData.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.category_name}
                      </option>
                    ))}
                  </Form.Select>
                </div>

                <div className="col-md-3">
                  <label className="form-label">Product Stock*</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Stock"
                    required
                    value={product_stock_quantity}
                    onChange={(e) => setProductStockQuantity(e.target.value)}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Description*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    required
                    value={product_description}
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Product Image:</label>
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
                        alt="Product"
                        style={{ width: "100px", height: "100px", borderRadius: "8px" }}
                      /> */}
                    </div>
                  )}
                </div>

                <div className="col-12 d-flex justify-content-between mt-2">
                  <Link to="/product">
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
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  );
}
