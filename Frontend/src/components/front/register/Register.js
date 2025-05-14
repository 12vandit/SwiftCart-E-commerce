import React , {useState} from 'react'
import HomeHeader from '../HomeHeader';
import Footer from '../Footer'
import  { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  axios from 'axios'



export default function Register() {

   const navigate = useNavigate()
   const [f_name, setF_name] = useState('');
   const [l_name, setL_name] = useState('');
   const [email, setEmail] = useState('')
   const [mobile, setMobile] = useState('')
   const [photo, setPhoto] = useState('')
   const [password, setPassword] = useState('')

   const handleSubmit = async(e)=>{
      e.preventDefault()

      const formData = new FormData();
        formData.append('f_name', f_name);
        formData.append('l_name', l_name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('photo', photo);
        formData.append('password', password);

        try {
         const response = await axios.post("http://localhost:3005/front-register",formData)
         if (response.data.success) {
            toast.success(response.data.message)
            setTimeout(() => {
               navigate('/login', { replace: true })
            }, 2000);
         } else {
            toast.error(response.data.message);
         }
        } catch (error) {
         console.log("Error:", error);
         
         toast.error("Something went wrong. Please try again.");
        }
   }
  return (
    <>
    <HomeHeader/>
      <section className="inner_page_head"  style={{ cursor: 'pointer' }}>
         <div className="container_fuild">
            <div className="row">
               <div className="col-md-12">
                  <div className="full">
                     <h3>Register Now</h3>
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
                     <form action="index.html" onSubmit={handleSubmit}>
                        <fieldset>
                           <ToastContainer/>
                           <input type="text" placeholder="Enter your First Name" name="name" value={f_name} onChange={(e)=>setF_name(e.target.value)} required />
                           <input type="text" placeholder="Enter your Last Name" name="lname" value={l_name} onChange={(e)=>setL_name(e.target.value)} required />
                           <input type="email" placeholder="Enter your email address" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                           <input type="number" placeholder="Enter your Number" name="number" value={mobile} onChange={(e)=>setMobile(e.target.value)} required />
                           <input type="password" placeholder="Enter your password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                           <input type="file" placeholder="Enter your images" name="images" 
                           onChange={(e)=>setPhoto(e.target.files[0])} 
                           />
                           <p>Already have an account? <Link to={'/login'}>Login</Link></p>
                           <input type="submit" value="Register Now!" />
                          
                        </fieldset>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         <Footer/>
      </section>
        
    </>
  )
}