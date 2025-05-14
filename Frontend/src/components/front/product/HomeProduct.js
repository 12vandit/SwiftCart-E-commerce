import React, { useEffect, useState } from 'react'
import HomeHeader from '../HomeHeader'
import Footer from '../Footer'
import axios from 'axios'


export default function HomeProduct() {
   const [data, setData] = useState([])

   //view api call
   const fetchData = async () => {
      try {
         const apiUrl = 'http://localhost:3005/viewproduct'
         const response = await axios.get(apiUrl)
         console.log("-------", response);
         if (response.data.success) {
            // console.log("response >>>>",response.data.data);
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
      <div>
         <HomeHeader />
         <section className="inner_page_head">
            <div className="container_fuild">
               <div className="row">
                  <div className="col-md-12">
                     <div className="full">
                        <h3>Product Grid</h3>
                     </div>
                  </div>
               </div>
            </div>
         </section>


         <section className="product_section layout_padding">
            <div className="container">
               <div className="heading_container heading_center">
                  <h2>
                     Our <span>products</span>
                  </h2>
               </div>
               <div className="row">
               {
                  data.map((value)=>{
                     return(
<div className="col-sm-6 col-md-4 col-lg-4">
                  <div className="box">
                     <div className="option_container">
                        <div className="options">
                           <a href="" className="option1">
                           Men's Shirt
                           </a>
                           <a href="" className="option2">
                           Buy Now
                           </a>
                        </div>
                     </div>
                     <div className="img-box">
                     <img src={value.photo} alt="fg" />
                     </div>
                     <div className="detail-box">
                     <h5>
                           {value.product_name}
                        </h5>
                        <h6>
                        ₹{value.product_price}
                        </h6>
                     </div>
                  </div>
               </div>
                     )
                     })
               }
               
             
            </div>
               
               <div className="btn-box">
                  <a href="">
                     View All products
                  </a>
               </div>
            </div>
         </section>
         <Footer />
      </div>
   )
}
