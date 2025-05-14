import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomeHeader() {
  const [data, setData] = useState([]); // Categories data
  const [products, setProducts] = useState([]); // Products data
  console.log(">>>>>>>>>>>>",products);
  
  const [categoryId, setCategoryId] = useState(null); // Currently selected category
  const navigate = useNavigate();
  const sessionData = localStorage.getItem("userToken");

  // Logout handler
  const handleLogOut = () => {
    localStorage.clear();
    navigate('/', { replace: true });
  };

  // Fetch categories from API
  const fetchData = async () => {
    try {
      const apiUrl = 'http://localhost:3005/viewcategorystatus';
      const response = await axios.get(apiUrl);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        console.log("Error: ", response.data.message);
      }
    } catch (error) {
      console.log("error fetching categories", error);
    }
  };

  // Fetch products based on category selection
  const fetchProducts = async () => {
    if (categoryId) {
      try {
        const apiUrl = `http://localhost:3005/product-list?product_category=${categoryId}`;
        const response = await axios.get(apiUrl);
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          console.error('Error:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <header className="header_section">
        <div className="container">
          <nav className="navbar navbar-expand-lg custom_nav-container"> 
            <Link to={"/"} className="navbar-brand">
              <img width="250px"  src="images/logo.png" alt="#" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className=""> </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to={"/home"} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/categoryfront"} className="nav-link">Category</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/blog"} className="nav-link">Blog</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/contact"} className="nav-link">Contact</Link>
                </li>

                <li className="nav-item">
                  <Link to={"/userprofile"} className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                  {sessionData ? <Link to={"/"} onClick={() => handleLogOut()} className="nav-link">Logout</Link> : <Link className="nav-link" to={"/register"}>Register</Link>}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/cart"}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 456.029 456.029" style={{ enableBackground: 'new 0 0 456.029 456.029' }} xmlSpace="preserve">
                      <g>
                        <path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z" />
                        <path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4C457.728,97.71,450.56,86.958,439.296,84.91z" />
                        <path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z" />
                      </g>
                    </svg>
                  </Link>
                </li>

                <div className="col-lg-3 d-none d-lg-block">
                  {/* Trigger Button */}
                  <a className="btn d-flex align-items-center justify-content-between w-100" data-toggle="collapse" href="#navbar-vertical">
                    <div className="nav-item dropdown dropright d-flex align-items-center">
                      <h6 className="text-dark m-0 d-flex align-items-center">
                        <i className="fa fa-bars mr-2"></i>Categories
                      </h6>
                      <i className="fa fa-angle-down text-dark ml-2"></i>
                    </div>
                  </a>

                  {/* Dropdown Menu */}
                  <div id="navbar-vertical" className="collapse position-absolute border rounded" style={{ top: "65px", left: "0", width: "100%", zIndex: 1000, backgroundColor: "#ffffff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                    {data.map((value, index) => (
                      <a
                        href="#"
                        key={index}
                        onClick={(e) => {
                           navigate("/product-list", {
                             state: {
                               lineData: value,
                               _id: value._id,
                             },
                           });
                         }}
                        className="dropdown-item"
                        style={{ color: "#333", padding: "10px 20px" }}
                      >
                        {value.category_name}
                      </a>
                    ))}
                  </div>
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
