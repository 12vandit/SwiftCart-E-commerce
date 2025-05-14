import React from 'react'
// import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect,useState } from 'react'
import HomeHeader from '../HomeHeader';
import Footer from '../Footer';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   //  const [rememberMe, setRememberMe] = useState(false);
const [errors, setErrors] = useState({});
const navigate = useNavigate();

const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!email.trim()) {
    newErrors.email = 'Email is required';
    }
    
    // Validate password
    if (!password.trim()) {
    newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (validateForm()) {
        const ApiUrl = 'http://localhost:3005/front-login';
        const body = {
          email: email,
          password: password,
        };
    
        try {
          const res = await axios.post(ApiUrl, body);
    
          console.log("Response:", res);
    
          if (res.data.success === true) {
            // Retrieve token and user ID from the response
            const token = res.data.token;
            const userId = res.data._id;
    
            // console.log("Token:", token);
            // console.log("User ID:", userId);
    
            // Store the token and user ID in localStorage
            localStorage.setItem('userToken', token);
            localStorage.setItem('user_Id', userId);
    
            // Notify the user of success
            toast.success(res.data.message);
            console.log("Message:", res.data.message);
    
            // Redirect to the home page after 2 seconds
            setTimeout(() => {
              navigate('/', { replace: true });
            }, 2000);
          } else {
            // Notify the user of failure
            toast.error(res.data.message);
            console.log("Login failed");
          }
        } catch (error) {
          // Handle request errors
          console.error("Error during login:", error);
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        // Form validation failed
        console.log('Form validation failed');
      }
    };
    
  return (
    <div  style={{ cursor: 'pointer' }}>
        <HomeHeader/>
        <ToastContainer/>
        <section className="inner_page_head">
         <div className="container_fuild">
            <div className="row">
               <div className="col-md-12">
                  <div className="full">
                     <h3>Login Now</h3>
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
                     <form action="index.html"
            onSubmit={handleSubmit}
            >
                        <fieldset>
                           <input type="email" placeholder="Enter your email " name="email" value={email}
                      required
                       onChange={(e)=> setEmail(e.target.value)} />
                           <input type="text" placeholder="Enter your password" name="name" value={password}
                      required
                       onChange={(e)=> setPassword(e.target.value)}/>
                           
                        </fieldset>
                        <p>Already have an account? <Link to={'/register'}>Register</Link></p>

                        <input type="submit" value="Login" />

                     </form>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <Footer/>
    </div>
  )
}