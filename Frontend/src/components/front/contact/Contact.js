import React, { useState, useEffect } from 'react';
import HomeHeader from '../HomeHeader';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

export default function Contact() {

  const navigate = useNavigate();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [business_email, setBusiness_email] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by checking for a token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false); 
      toast.error("You need to log in to submit a contact form");
     
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the user is not logged in, don't allow form submission
    if (!isLoggedIn) {
      toast.error("Please log in before submitting the form.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3005/front-contact-add", {
        first_name,
        last_name,
        company,
        phone,
        business_email,
        message,
      });

      const msg = response.data.message;
      if (response.data.success === true) {
        toast.success(msg);
        setTimeout(() => {
        }, 2000);
        setFirst_name("");
        setLast_name("");
        setBusiness_email("");
        setCompany("");
        setMessage("");
        setPhone("");
      } else {
        toast.error(msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while submitting the form.");
    }
  };

  return (
    <div style={{ cursor: 'pointer' }}>
      <HomeHeader />
      <section className="inner_page_head">
        <ToastContainer />
        <div className="container_fuild">
          <div className="row">
            <div className="col-md-12">
              <div className="full">
                <h3>Contact Us</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="full">
                <form onSubmit={handleSubmit}>
                  <fieldset>
                    <input
                      type="text"
                      placeholder="Enter your First Name"
                      value={first_name}
                      onChange={(e) => setFirst_name(e.target.value)}
                      required
                      disabled={!isLoggedIn}
                    />
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      value={last_name}
                      onChange={(e) => setLast_name(e.target.value)}
                      required
                      disabled={!isLoggedIn}
                    />
                    <input
                      type="email"
                      placeholder="Enter your Business Email"
                      value={business_email}
                      onChange={(e) => setBusiness_email(e.target.value)}
                      required
                      disabled={!isLoggedIn}
                    />
                    <input
                      type="text"
                      placeholder="Enter Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      disabled={!isLoggedIn}
                    />
                    <input
                      type="number"
                      placeholder="Enter Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      disabled={!isLoggedIn}
                    />
                    <input
                      type="text"
                      placeholder="Enter Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      disabled={!isLoggedIn}
                    />
                    <input
                      type="submit"
                      value="Submit"
                      disabled={!isLoggedIn}
                    />
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="arrival_section">
        <div className="container">
          <div className="box">
            <div className="arrival_bg_box">
              <img src="images/arrival-bg.png" alt="" />
            </div>
            <div className="row">
              <div className="col-md-6 ml-auto">
                <div className="heading_container remove_line_bt">
                  <h2>#NewArrivals</h2>
                </div>
                <p style={{ marginTop: "20px", marginBottom: "30px" }}>
                  Vitae fugiat laboriosam officia perferendis provident aliquid voluptatibus dolorem, fugit ullam sit earum id eaque nisi hic? Tenetur commodi, nisi rem vel, ea eaque ab ipsa, autem similique ex unde!
                </p>
                <a href="#">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
