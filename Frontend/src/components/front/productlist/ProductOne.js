import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message, Spin, Card } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import HomeHeader from "../HomeHeader";
import Footer from "../Footer";

export default function ProductOne() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const location = useLocation();
  const categoryId = location.state?._id; 

  // Fetch product data from API
  const fetchData = async () => {
    try {
      const apiUrl = `http://localhost:3005/product-one?_id=${categoryId}`;
      const response = await axios.get(apiUrl);

      if (response.data.success) {
        setData(response.data.data); 
      } else {
        console.log("Error: ", response.data.message);
      }
    } catch (error) {
      console.log("Error fetching product data:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle adding product to cart
  const addToCart = async (productId) => {
    try {
      const userId = localStorage.getItem("user_Id");
      if (!userId) {
        message.error("You must be logged in to add items to your cart.");
        // navigate("/login"); 
        return;
      }

      const quantity = 1; 

      const response = await axios.post("http://localhost:3005/add-to-cart", {
        userId,
        productId,
        quantity,
      });

      if (response.data.success) {
        message.success(response.data.message);
        // navigate("/cart"); 
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      message.error("Failed to add product to cart");
    }
  };

  return (
    <div style={{ cursor: 'pointer' }}>
      <HomeHeader />
      <section className="inner_page_head">
        <div className="container_fuild">
          <div className="row">
            <div className="col-md-12">
              <div className="full">
                <h3>Products Detail</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product_section layout_padding" style={{ padding: "30px 0", background: "#f9f9f9" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Spin size="large" />
          </div>
        ) : (
          data.map((value) => (
            <Card
              key={value._id}
              style={{
                maxWidth: "1200px",
                margin: "20px auto",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              hoverable
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                <div>
                  <img
                    src={value.photo}
                    alt={value.product_name}
                    style={{
                      width: "400px",
                      height: "400px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </div>
                <div style={{ flex: 1, paddingLeft: "147px" }}>
                  <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>{value.product_name}</h2>
                  <p style={{ fontSize: "18px", color: "#555" }}>
                    <strong>Price: </strong>₹{value.product_price}
                  </p>
                  <p style={{ fontSize: "16px", color: "#777", marginBottom: "20px" }}>
                    {value.product_description}
                  </p>
                  <div style={{ display: "flex", gap: "50px" }}>
                    <Button
                      style={{ background: "green", color: "white", border: "none" }}
                      onClick={() => addToCart(value._id)}
                    >
                      Add to Cart
                    </Button>
                   
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </section>

      <Footer />
    </div>
  );
}
