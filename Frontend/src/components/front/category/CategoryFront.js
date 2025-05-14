import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
import HomeHeader from '../HomeHeader';
import Footer from '../Footer';


export default function CategoryFront() {
   const [data, setData] = useState([])
   const navigate = useNavigate();
   //view api call
   const fetchData = async () => {
      try {
         const apiUrl = 'http://localhost:3005/viewcategorystatus'
         const response = await axios.get(apiUrl)
         if (response.data.success) {
            setData(response.data.data)
         } else {
            console.log("Error: ", response.data.message);
         }
      } catch (error) {
         console.log("error fetching users", error);

      }
   }
   useEffect(() => {
      fetchData()
   }, [])


   console.log("data", data);

   return (
      <div  style={{ cursor: 'pointer' }}>
         <HomeHeader/>
         <section className="inner_page_head">
            <div className="container_fuild">
               <div className="row">
                  <div className="col-md-12">
                     <div className="full">
                        <h3>Category Grid</h3>
                     </div>
                  </div>
               </div>
            </div>
         </section>


         <section className="product_section layout_padding">
            <div className="container">
               <div className="heading_container heading_center">
                  <h2>
                     Our <span>category</span>
                  </h2>
               </div>
              



<div class="row">
               {
                  data.map((value)=>{
                     return(
<div class="col-sm-6 col-md-4 col-lg-4"
onClick={(e) => {
   navigate("/product-list", {
     state: {
       lineData: value,
       _id: value._id,
     },
   });
 }}

>
   {/* <Link to={"/product-list"}> */}
                  <div class="box">
                     <div class="img-box">
                     <img src={value.photo} alt="fg" />
                     </div>
                     <div class="detail-box">
                     <h5>
                           {value.category_name}
                        </h5>
                     </div>
                  </div>
                  {/* </Link> */}
               </div>
                     )
                     })
               }
               
            
            </div>
               
            </div>
         </section>
         <Footer />
      </div>
   )
}