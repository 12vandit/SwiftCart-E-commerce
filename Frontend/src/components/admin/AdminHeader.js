import React, { useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

export default function AdminHeader() {

const navigate = useNavigate();
useEffect(()=>{
 const sessionData = localStorage.getItem('adminToken');
 if (!sessionData) {
  navigate('/adminLogin',{ replace: true });
return
  
 }

},[])

const handleLogOut =()=>{
  localStorage.clear();
  navigate('/adminLogin',{ replace: true });

}
  return (
    <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ToastContainer/>
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                <Link to={"/dashboard"} href="#" className="nav-link">Home</Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link" onClick={() =>{handleLogOut()}}>Logout</a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                <Link to={"/myprofile"} className="nav-link">My Profile</Link>
                </li>
            </ul>
            {/* Right navbar links */}
            </nav>


    </div>
  )
}
