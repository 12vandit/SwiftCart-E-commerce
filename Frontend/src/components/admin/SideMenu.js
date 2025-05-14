import React from 'react'
import { Link } from 'react-router-dom'

export default function SideMenu() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Brand Logo */}
    <a href="#" className="brand-link">
        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light">Swift Cart </span>
    </a>
    {/* Sidebar */}
    <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
            <a href="#" className="d-block">Ritesh</a>
        </div>
        </div>
        <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Add icons to the links using the .nav-icon class
                with font-awesome or any other icon font library */}
            <li className="nav-item menu-open">
            <Link to={"/dashboard"}  className="nav-link active">
                <i className="nav-icon fas fa-th-large" />
                <p>
                Dashboard
                </p>
            </Link>
            </li>


            <li className="nav-item menu-open">
            <Link to={"/user"} href="#" className="nav-link active">
                <i className="nav-icon fas fa-user-alt" />
                <p>
                User
                </p>
            </Link>
            </li>

            <li className="nav-item menu-open">
            <Link to={"/product"} href="#" className="nav-link active">
                <i className="nav-icon fas fa-tags" />
                <p>
                Product
                </p>
            </Link>
            </li>

            <li className="nav-item menu-open">
            <Link to={"/category"} href="#" className="nav-link active">
                <i className="nav-icon fas fa-list" />
                <p>
                Category
                </p>
            </Link>
            </li>
            <li className="nav-item menu-open">
            <Link to={"/banner"} href="#" className="nav-link active">
                <i className=" nav-icon fas fa-image" />
                <p>
                Banner
                </p>
            </Link>
            </li>

            <li className="nav-item menu-open">
            <Link to={"/contactus"} href="#" className="nav-link active">
                <i className="nav-icon	fas fa-phone" />
                <p>
                ContactUs
                </p>
            </Link>
            </li>

            <li className="nav-item menu-open">
            <Link to={"/order"} href="#" className="nav-link active">
                <i className="nav-icon fa fa-shopping-cart" />
                <p>
               Order
                </p>
            </Link>
            </li>
         
        </ul>
        </nav>
        {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
</aside>
  )
}