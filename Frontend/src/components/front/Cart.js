import React, { useState, useEffect } from 'react';
import HomeHeader from './HomeHeader';
import Footer from './Footer';
import axios from 'axios';
import { Button, message } from 'antd';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const userId = localStorage.getItem('user_Id');

  useEffect(() => {
    if (!userId) {
      message.error('Please login to view your cart.');
      navigate('/login');
      return;
    }

    const fetchCartData = async () => {
      try {
        const response = await axios.post('http://localhost:3005/cart-view', { userId });
        if (response.data.success) {
          setCartItems(response.data.data);
        } else {
          setError(response.data.message || 'No items found in the cart');
        }
      } catch (err) {
        console.error('Error fetching cart data:', err);
        setError(err.response?.data?.message || 'Failed to fetch cart data');
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [userId, navigate]);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.productId.product_price * (item.quantity || 1), 0);

  const removeItem = async (productId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be removed from your cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post('http://localhost:3005/cart-delete', { userId, productId });
        if (response.data.success) {
          message.success('Product removed from cart successfully');
          setCartItems(cartItems.filter((item) => item.productId._id !== productId));
        } else {
          message.error(response.data.message || 'Failed to remove product from cart');
        }
      } catch (err) {
        console.error('Error removing item from cart:', err);
        message.error(err.response?.data?.message || 'Failed to remove product from cart');
      }
    }
  };




  const handlePayment = async () => {
    const totalPrice = calculateTotal();

    const productIds = cartItems.map(item => item.productId._id);

    try {
      const apiUrl = "http://localhost:3005/createpayment";

      const body = {
        product_price: totalPrice * 100, // Convert to smallest currency unit
        userId,
        productId: productIds,
      };

      const response = await axios.post(apiUrl, body);

      const paymentUrl = response.data.data.url;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.error("Payment session creation failed.");
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Payment failed. Please try again.");
    }
  };




  // Function to increase item quantity
  const increaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = (newCartItems[index].quantity || 1) + 1;
    setCartItems(newCartItems);
  };

  // Function to decrease item quantity
  const decreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
    }
  };

  return (
    <div style={{ cursor: 'pointer' }}>
      <HomeHeader />
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-8">
            <div className="p-2">
              <h4>Shopping Cart</h4>
            </div>
            {loading ? (
              <p>Loading cart...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : cartItems.length > 0 ? (
              <>
                {cartItems.map((item, index) => (
                  <div
                    key={item._id}
                    className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded"
                  >
                    <div className="mr-1">
                      <img
                        className="rounded"
                        src={item.photo || item.productId.photo}
                        alt="Product"
                        width="70"
                      />
                    </div>
                    <div className="d-flex flex-column align-items-start product-details">
                      <span className="font-weight-bold">{item.productId.product_name}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center qty">
                      <button
                        onClick={() => decreaseQuantity(index)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        -
                      </button>
                      <h5 className="text-grey mt-1 mr-1 ml-1">{item.quantity || 1}</h5>
                      <button
                        onClick={() => increaseQuantity(index)}
                        className="btn btn-sm btn-outline-success"
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <h5 className="text-grey">
                        ₹{item.productId.product_price * (item.quantity || 1)}
                      </h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <Button
                        onClick={() => removeItem(item.productId._id)}
                        type="primary"
                        danger
                        icon={<i className="fa fa-trash" />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-between mt-4">
                  <div>
                  <h5>Total: ₹{calculateTotal()}</h5>
                  </div>
                  <Button type="primary"onClick={(e)=>handlePayment()}>
                    Proceed to Payment
                  </Button>
                </div>
               
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
