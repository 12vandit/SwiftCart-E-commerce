import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeHeader from '../HomeHeader';
import Footer from '../Footer';

export default function ProductList() {
  const [products, setProducts] = useState([]); // Renamed for better clarity
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>",products);
  
  const navigate = useNavigate();
  const location = useLocation();
  const categoryId = location.state?._id; // Get `categoryId` from state passed via navigation

  // Function to fetch products by category
  const fetchProducts = async () => {
    try {
      const apiUrl = `http://localhost:3005/product-list?product_category=${categoryId}`;
      const response = await axios.get(apiUrl);

      if (response.data.success) {
        setProducts(response.data.data); // Set the products to state
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch data when `categoryId` is present
  useEffect(() => {
    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  return (
    <div>
      <HomeHeader />
      {/* Section Header */}
      <section className="inner_page_head"  style={{ cursor: 'pointer' }}>
        <div className="container_fuild">
          <div className="row">
            <div className="col-md-12">
              <div className="full" >
                <h3 >All Products</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product List Section */}
      <section className="product_section layout_padding"  style={{ cursor: 'pointer' }}>
        <div className="container">
          <div className="row">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  className="col-sm-6 col-md-4 col-lg-4"
                  key={product._id}
                  onClick={() =>
                    navigate('/productdetail', {
                      state: { lineData: product, _id: product._id },
                    })
                  }
                >
                  <div className="box" style={{ cursor: 'pointer' }}>
                    <div className="img-box">
                      <img
                        src={product.photo}
                        alt={product.product_name}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                    </div>
                    <div className="detail-box">
                      <h5>{product.product_name}</h5>
                      <h6>₹{product.product_price}</h6>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-md-12"  style={{ cursor: 'pointer' }}>
                <p style={{ textAlign: 'center', padding: '20px', color: '#555' }}>
                  No products found for this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
