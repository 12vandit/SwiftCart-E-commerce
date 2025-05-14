import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Start loading
      try {
        const ApiUrl = 'http://localhost:3005/loginuser';
        const body = { email, password };
        const res = await axios.post(ApiUrl, body);

        if (res.data.success === true) {
          const token = res.data.token;
          localStorage.setItem('adminToken', token);
          toast.success(res.data.message);
          setTimeout(() => navigate('/dashboard', { replace: true }), 2000);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
        console.error(error);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  return (
    <div className="login-box" style={{ margin: 'auto', padding: '100px 0px' }}>
      <div className="card card-outline card-primary">
        <ToastContainer />
        <div className="card-header text-center">
          <a href="#" className="h1"><b>Swift Cart</b></a>
        </div>
        <div className="card-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <div className="row">
              <div className="col-8">
                <div className="icheck-primary">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="remember">Remember Me</label>
                </div>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block" >{loading ? <>loading..</>:<>Sign In</>}  </button>
              </div>
            </div>
          </form>
          <p className="mb-1">
            <a href="#">I forgot my password</a>
          </p>
        </div>
      </div>
    </div>
  );
}
