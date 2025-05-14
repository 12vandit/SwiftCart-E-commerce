// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// front Routes
import HomeHeader from './components/front/HomeHeader';
import Home from './components/front/Home';
import Footer from './components/front/Footer';
import HomeProduct from './components/front/product/HomeProduct';
import Blog from './components/front/Blog/Blog';
import Contact from './components/front/contact/Contact';
import Login from './components/front/login/Login';
// Admin Routes
import Dashboard from './components/admin/Dashboard';
import AdminLogin from './components/admin/AdminLogin';
import User from './components/admin/user/User'
import Add from './components/admin/user/Add';
import Product from './components/admin/user/Product';
import Edit from './components/admin/user/Edit';
import Category from './components/admin/user/Category';
import AddProduct from './components/admin/user/AddProduct';
import EditProduct from './components/admin/user/EditProduct';
import AddCategory from './components/admin/user/AddCategory';
import EditCategory from './components/admin/user/EditCategory';
import MyProfile from './components/admin/user/MyProfile';
import Banner from './components/admin/user/Banner';
import AddBanner from './components/admin/user/AddBanner';
import EditBanner from './components/admin/user/EditBanner';
import ContactUs from './components/admin/user/ContactUs';
import AddContact from './components/admin/user/AddContact';
import EditContact from './components/admin/user/EditContact'
import Register from './components/front/register/Register';
import CategoryFront from './components/front/category/CategoryFront';
import ProductList from './components/front/productlist/ProductList';
import ProductOne from './components/front/productlist/ProductOne';
import EditProfile from './components/admin/user/EditProfile';
import Cart from './components/front/Cart';
import Order from './components/admin/user/Order';
import AddOrder from './components/admin/user/AddOrder';
import Payment from './components/front/Payment';
import PaymentSuccess from './components/front/PaymentSuccess';
import UserProfile from './components/front/profile/UserProfile';
import EditUserProfile from './components/front/profile/EditUserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>

{/* front Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />


        {/* Admin Routes */}
        <Route  path="/adminlogin" element={<AdminLogin />} />
        <Route  path="/dashboard" element={<Dashboard />} />
        <Route  path="/adduser" element={< Add/>} />
        <Route  path="/myprofile" element={< MyProfile/>} />
        <Route  path="/dashboard" element={< Dashboard/>} />



        {/* user routes */}
        <Route path="/user" element={<User />} />
        <Route path="/cancel" element={<User />} />
        <Route path="/submit" element={<User />} />
       <Route path="/edituser" element={<Edit />} />


       
       {/* product router */}
       <Route path="/product" element={<Product />} />
       <Route path="/editproduct" element={<EditProduct/>} />
    
       <Route path="/cancel1" element={<Product />} />
        <Route path="/submit1" element={<Product />} />
        <Route path="/addproduct" element={<AddProduct />} />


       {/* category router */}
       <Route path="/category" element={<Category />} />
       <Route path="/addcategory" element={<AddCategory />} />
       <Route path="/cancel2" element={<Category />} />
       <Route path="/submit2" element={<Category />} />
       <Route path="/editcategory" element={<EditCategory />} />

{/* banner router */}
       <Route path="/banner" element={<Banner />} />
       <Route path="/addbanner" element={<AddBanner />} />
       <Route path="/editbanner" element={<EditBanner />} />


{/* contact router */}

<Route path="/contactus" element={<ContactUs />} />
<Route  path="/addcontact" element={< AddContact/>} />
<Route  path="/editcontactus" element={< EditContact/>} />



{/* // product router */}
<Route path="/homeheader" element={<HomeHeader />} />
<Route path="/footer" element={<Footer />} />
<Route path="/blog" element={<Blog />} />
<Route path="/contact" element={<Contact />} />
<Route path="/home" element={<Home />} />

<Route path="/producthome" element={<HomeProduct />} />
<Route path="/categoryfront" element={<CategoryFront />} />

<Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />
<Route path="/product-list" element={<ProductList />} />
<Route path="/productdetail" element={<ProductOne />} />

{/* profile router */}
<Route path="/edit-profile" element={<EditProfile />} />
<Route path="/profile" element={<MyProfile />} />
<Route path="/order" element={<Order />} />
<Route path="/addorder" element={<AddOrder />} />
<Route path="/payment" element={<Payment />} />
<Route path="/PaymentSuccess" element={<PaymentSuccess />} />

<Route path="/userprofile" element={<UserProfile/>} />
<Route path="/edituserprofile" element={<EditUserProfile/>} />
















      </Routes>
    </BrowserRouter>
  );
}

export default App;
