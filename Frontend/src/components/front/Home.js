import React ,{useEffect,useState}from 'react'
import HomeHeader from './HomeHeader'
import Footer from './Footer'
import axios from 'axios'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
const navigate= useNavigate();
   const [banner, setBanner] = useState([])
   const [data, setData] = useState([])
   const [user, setUser] = useState([])

   console.log("user",user);
   




   

   //view api call

   const bannerView = async () => {
      try {
        const apiUrl = 'http://localhost:3005/viewbannerstatus';
        const response = await axios.get(apiUrl)
      //   console.log(">>>>>>>>>>>>>>>>>>>",response.data)
       if (response.data.success === true) {
         setBanner(response.data.data) 
  
        } else {
          console.log("Errorrrrr")
        }
  
      } catch (error) {
        console.log("err", error)
  
      }
    }

    useEffect(() => {
      bannerView();
    }, [])
 
   const fetchData = async () => {
      try {
         const apiUrl = 'http://localhost:3005/viewcategorystatus'
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

   const [userTestimonials, setUserTestimonials] = useState([]);
   const [loading, setLoading] = useState(true);
 
   // Fetch testimonials data from the API
   const fetchTestimonials = async () => {
     try {
       const userId = localStorage.getItem("user_Id"); // Fetch the logged-in user's ID
       if (!userId) {
         console.error("User is not logged in.");
         return;
       }
 
       const response = await axios.get(`http://localhost:3005/viewuserstatus?userId=${userId}`);
       if (response.data.success) {
         setUserTestimonials(response.data.data); // Update the state with testimonials data
       } else {
         console.error("Error fetching testimonials:", response.data.message);
       }
     } catch (error) {
       console.error("Error fetching testimonials:", error);
     } finally {
       setLoading(false);
     }
   };
 
   useEffect(() => {
     fetchTestimonials();
   }, []);


  return (
    <div>
        <HomeHeader/>
         <section className="slider_section "  style={{ cursor: 'pointer' }}>
            <div className="slider_bg_box">
            <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      //   navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
       {banner.length > 0 ? (
              banner.map((bannerItem, index) => (
                <SwiperSlide key={index}  style={{ cursor: 'pointer' }}>
                  <img src={bannerItem.photo} alt={bannerItem.photo}/>
                </SwiperSlide>
              ))
              ) : (
               <SwiperSlide>
                 <img src="images/slider-bg.jpg" alt="Default Slider" />
               </SwiperSlide>
             )}
        </Swiper>
      
            </div>
            <div id="customCarousel1" className="carousel slide" data-ride="carousel"  style={{ cursor: 'pointer' }}>
               <div className="carousel-inner">
                  <div className="carousel-item active">
                     <div className="container ">
                        <div className="row">
                           <div className="col-md-7 col-lg-6 ">
                              <div className="detail-box">
                                
                                
                                
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                 
                  
               </div>
              
            </div>

         </section>

        

            <section class="why_section layout_padding"  style={{ cursor: 'pointer' }}>
         <div class="container">
            <div class="heading_container heading_center">
               <h2>
                  Why Shop With Us
               </h2>
            </div>
            <div class="row"  style={{ cursor: 'pointer' }}>
               <div class="col-md-4">
                  <div class="box ">
                     <div class="img-box"  style={{ cursor: 'pointer' }}>
                           <g>
                              <g>
                                 <path d="M476.158,231.363l-13.259-53.035c3.625-0.77,6.345-3.986,6.345-7.839v-8.551c0-18.566-15.105-33.67-33.67-33.67h-60.392
                                    V110.63c0-9.136-7.432-16.568-16.568-16.568H50.772c-9.136,0-16.568,7.432-16.568,16.568V256c0,4.427,3.589,8.017,8.017,8.017
                                    c4.427,0,8.017-3.589,8.017-8.017V110.63c0-0.295,0.239-0.534,0.534-0.534h307.841c0.295,0,0.534,0.239,0.534,0.534v145.372
                                    c0,4.427,3.589,8.017,8.017,8.017c4.427,0,8.017-3.589,8.017-8.017v-9.088h94.569c0.008,0,0.014,0.002,0.021,0.002
                                    c0.008,0,0.015-0.001,0.022-0.001c11.637,0.008,21.518,7.646,24.912,18.171h-24.928c-4.427,0-8.017,3.589-8.017,8.017v17.102
                                    c0,13.851,11.268,25.119,25.119,25.119h9.086v35.273h-20.962c-6.886-19.883-25.787-34.205-47.982-34.205
                                    s-41.097,14.322-47.982,34.205h-3.86v-60.393c0-4.427-3.589-8.017-8.017-8.017c-4.427,0-8.017,3.589-8.017,8.017v60.391H192.817
                                    c-6.886-19.883-25.787-34.205-47.982-34.205s-41.097,14.322-47.982,34.205H50.772c-0.295,0-0.534-0.239-0.534-0.534v-17.637
                                    h34.739c4.427,0,8.017-3.589,8.017-8.017s-3.589-8.017-8.017-8.017H8.017c-4.427,0-8.017,3.589-8.017,8.017
                                    s3.589,8.017,8.017,8.017h26.188v17.637c0,9.136,7.432,16.568,16.568,16.568h43.304c-0.002,0.178-0.014,0.355-0.014,0.534
                                    c0,27.996,22.777,50.772,50.772,50.772s50.772-22.776,50.772-50.772c0-0.18-0.012-0.356-0.014-0.534h180.67
                                    c-0.002,0.178-0.014,0.355-0.014,0.534c0,27.996,22.777,50.772,50.772,50.772c27.995,0,50.772-22.776,50.772-50.772
                                    c0-0.18-0.012-0.356-0.014-0.534h26.203c4.427,0,8.017-3.589,8.017-8.017v-85.511C512,251.989,496.423,234.448,476.158,231.363z
                                    M375.182,144.301h60.392c9.725,0,17.637,7.912,17.637,17.637v0.534h-78.029V144.301z M375.182,230.881v-52.376h71.235
                                    l13.094,52.376H375.182z M144.835,401.904c-19.155,0-34.739-15.583-34.739-34.739s15.584-34.739,34.739-34.739
                                    c19.155,0,34.739,15.583,34.739,34.739S163.99,401.904,144.835,401.904z M427.023,401.904c-19.155,0-34.739-15.583-34.739-34.739
                                    s15.584-34.739,34.739-34.739c19.155,0,34.739,15.583,34.739,34.739S446.178,401.904,427.023,401.904z M495.967,299.29h-9.086
                                    c-5.01,0-9.086-4.076-9.086-9.086v-9.086h18.171V299.29z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M144.835,350.597c-9.136,0-16.568,7.432-16.568,16.568c0,9.136,7.432,16.568,16.568,16.568
                                    c9.136,0,16.568-7.432,16.568-16.568C161.403,358.029,153.971,350.597,144.835,350.597z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M427.023,350.597c-9.136,0-16.568,7.432-16.568,16.568c0,9.136,7.432,16.568,16.568,16.568
                                    c9.136,0,16.568-7.432,16.568-16.568C443.591,358.029,436.159,350.597,427.023,350.597z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M332.96,316.393H213.244c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017H332.96
                                    c4.427,0,8.017-3.589,8.017-8.017S337.388,316.393,332.96,316.393z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M127.733,282.188H25.119c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h102.614
                                    c4.427,0,8.017-3.589,8.017-8.017S132.16,282.188,127.733,282.188z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M278.771,173.37c-3.13-3.13-8.207-3.13-11.337,0.001l-71.292,71.291l-37.087-37.087c-3.131-3.131-8.207-3.131-11.337,0
                                    c-3.131,3.131-3.131,8.206,0,11.337l42.756,42.756c1.565,1.566,3.617,2.348,5.668,2.348s4.104-0.782,5.668-2.348l76.96-76.96
                                    C281.901,181.576,281.901,176.501,278.771,173.37z" />
                              </g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                        
                     </div>
                     <div class="detail-box"  style={{ cursor: 'pointer' }}>
                        <h5>
                           Fast Delivery
                        </h5>
                        <p>
                           variations of passages of Lorem Ipsum available
                        </p>
                     </div>
                  </div>
               </div>
               <div class="col-md-4"  style={{ cursor: 'pointer' }}>
                  <div class="box ">
                     <div class="img-box">
                      
                           <g>
                              <g>
                                 <path d="M138.667,192H96c-5.888,0-10.667,4.779-10.667,10.667V288c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667
                                    v-74.667h32c5.888,0,10.667-4.779,10.667-10.667S144.555,192,138.667,192z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M117.333,234.667H96c-5.888,0-10.667,4.779-10.667,10.667S90.112,256,96,256h21.333c5.888,0,10.667-4.779,10.667-10.667
                                    S123.221,234.667,117.333,234.667z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M245.333,0C110.059,0,0,110.059,0,245.333s110.059,245.333,245.333,245.333s245.333-110.059,245.333-245.333
                                    S380.608,0,245.333,0z M245.333,469.333c-123.52,0-224-100.48-224-224s100.48-224,224-224s224,100.48,224,224
                                    S368.853,469.333,245.333,469.333z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M386.752,131.989C352.085,88.789,300.544,64,245.333,64s-106.752,24.789-141.419,67.989
                                    c-3.691,4.587-2.965,11.307,1.643,14.997c4.587,3.691,11.307,2.965,14.976-1.643c30.613-38.144,76.096-60.011,124.8-60.011
                                    s94.187,21.867,124.779,60.011c2.112,2.624,5.205,3.989,8.32,3.989c2.368,0,4.715-0.768,6.677-2.347
                                    C389.717,143.296,390.443,136.576,386.752,131.989z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M376.405,354.923c-4.224-4.032-11.008-3.861-15.061,0.405c-30.613,32.235-71.808,50.005-116.011,50.005
                                    s-85.397-17.771-115.989-50.005c-4.032-4.309-10.816-4.437-15.061-0.405c-4.309,4.053-4.459,10.816-0.405,15.083
                                    c34.667,36.544,81.344,56.661,131.456,56.661s96.789-20.117,131.477-56.661C380.864,365.739,380.693,358.976,376.405,354.923z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M206.805,255.723c15.701-2.027,27.861-15.488,27.861-31.723c0-17.643-14.357-32-32-32h-21.333
                                    c-5.888,0-10.667,4.779-10.667,10.667v42.581c0,0.043,0,0.107,0,0.149V288c0,5.888,4.779,10.667,10.667,10.667
                                    S192,293.888,192,288v-16.917l24.448,24.469c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.531-3.136
                                    c4.16-4.16,4.16-10.923,0-15.083L206.805,255.723z M192,234.667v-21.333h10.667c5.867,0,10.667,4.779,10.667,10.667
                                    s-4.8,10.667-10.667,10.667H192z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M309.333,277.333h-32v-64h32c5.888,0,10.667-4.779,10.667-10.667S315.221,192,309.333,192h-42.667
                                    c-5.888,0-10.667,4.779-10.667,10.667V288c0,5.888,4.779,10.667,10.667,10.667h42.667c5.888,0,10.667-4.779,10.667-10.667
                                    S315.221,277.333,309.333,277.333z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M288,234.667h-21.333c-5.888,0-10.667,4.779-10.667,10.667S260.779,256,266.667,256H288
                                    c5.888,0,10.667-4.779,10.667-10.667S293.888,234.667,288,234.667z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M394.667,277.333h-32v-64h32c5.888,0,10.667-4.779,10.667-10.667S400.555,192,394.667,192H352
                                    c-5.888,0-10.667,4.779-10.667,10.667V288c0,5.888,4.779,10.667,10.667,10.667h42.667c5.888,0,10.667-4.779,10.667-10.667
                                    S400.555,277.333,394.667,277.333z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M373.333,234.667H352c-5.888,0-10.667,4.779-10.667,10.667S346.112,256,352,256h21.333
                                    c5.888,0,10.667-4.779,10.667-10.667S379.221,234.667,373.333,234.667z" />
                              </g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                        
                     </div>
                     <div class="detail-box">
                        <h5>
                           Free Shiping
                        </h5>
                        <p>
                           variations of passages of Lorem Ipsum available
                        </p>
                     </div>
                  </div>
               </div>
              
               <div class="col-md-4"  style={{ cursor: 'pointer' }}>
                  <div class="box ">
                     <div class="img-box">
                      
                           <g>
                              <g>
                                 <path d="M138.667,192H96c-5.888,0-10.667,4.779-10.667,10.667V288c0,5.888,4.779,10.667,10.667,10.667s10.667-4.779,10.667-10.667
                                    v-74.667h32c5.888,0,10.667-4.779,10.667-10.667S144.555,192,138.667,192z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M117.333,234.667H96c-5.888,0-10.667,4.779-10.667,10.667S90.112,256,96,256h21.333c5.888,0,10.667-4.779,10.667-10.667
                                    S123.221,234.667,117.333,234.667z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M245.333,0C110.059,0,0,110.059,0,245.333s110.059,245.333,245.333,245.333s245.333-110.059,245.333-245.333
                                    S380.608,0,245.333,0z M245.333,469.333c-123.52,0-224-100.48-224-224s100.48-224,224-224s224,100.48,224,224
                                    S368.853,469.333,245.333,469.333z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M386.752,131.989C352.085,88.789,300.544,64,245.333,64s-106.752,24.789-141.419,67.989
                                    c-3.691,4.587-2.965,11.307,1.643,14.997c4.587,3.691,11.307,2.965,14.976-1.643c30.613-38.144,76.096-60.011,124.8-60.011
                                    s94.187,21.867,124.779,60.011c2.112,2.624,5.205,3.989,8.32,3.989c2.368,0,4.715-0.768,6.677-2.347
                                    C389.717,143.296,390.443,136.576,386.752,131.989z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M376.405,354.923c-4.224-4.032-11.008-3.861-15.061,0.405c-30.613,32.235-71.808,50.005-116.011,50.005
                                    s-85.397-17.771-115.989-50.005c-4.032-4.309-10.816-4.437-15.061-0.405c-4.309,4.053-4.459,10.816-0.405,15.083
                                    c34.667,36.544,81.344,56.661,131.456,56.661s96.789-20.117,131.477-56.661C380.864,365.739,380.693,358.976,376.405,354.923z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M206.805,255.723c15.701-2.027,27.861-15.488,27.861-31.723c0-17.643-14.357-32-32-32h-21.333
                                    c-5.888,0-10.667,4.779-10.667,10.667v42.581c0,0.043,0,0.107,0,0.149V288c0,5.888,4.779,10.667,10.667,10.667
                                    S192,293.888,192,288v-16.917l24.448,24.469c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.531-3.136
                                    c4.16-4.16,4.16-10.923,0-15.083L206.805,255.723z M192,234.667v-21.333h10.667c5.867,0,10.667,4.779,10.667,10.667
                                    s-4.8,10.667-10.667,10.667H192z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M309.333,277.333h-32v-64h32c5.888,0,10.667-4.779,10.667-10.667S315.221,192,309.333,192h-42.667
                                    c-5.888,0-10.667,4.779-10.667,10.667V288c0,5.888,4.779,10.667,10.667,10.667h42.667c5.888,0,10.667-4.779,10.667-10.667
                                    S315.221,277.333,309.333,277.333z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M288,234.667h-21.333c-5.888,0-10.667,4.779-10.667,10.667S260.779,256,266.667,256H288
                                    c5.888,0,10.667-4.779,10.667-10.667S293.888,234.667,288,234.667z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M394.667,277.333h-32v-64h32c5.888,0,10.667-4.779,10.667-10.667S400.555,192,394.667,192H352
                                    c-5.888,0-10.667,4.779-10.667,10.667V288c0,5.888,4.779,10.667,10.667,10.667h42.667c5.888,0,10.667-4.779,10.667-10.667
                                    S400.555,277.333,394.667,277.333z" />
                              </g>
                           </g>
                           <g>
                              <g>
                                 <path d="M373.333,234.667H352c-5.888,0-10.667,4.779-10.667,10.667S346.112,256,352,256h21.333
                                    c5.888,0,10.667-4.779,10.667-10.667S379.221,234.667,373.333,234.667z" />
                              </g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                           <g>
                           </g>
                        
                     </div>
                     <div class="detail-box">
                        <h5>
                           Best Quality
                        </h5>
                        <p>
                           variations of passages of Lorem Ipsum available
                        </p>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>

         <section class="arrival_section"  style={{ cursor: 'pointer' }}>
         <div class="container">
            <div class="box">
               <div class="arrival_bg_box">
                  <img src="images/arrival-bg.png" alt=""/>
               </div>
               <div class="row">
                  <div class="col-md-6 ml-auto">
                     <div class="heading_container remove_line_bt">
                        <h2>
                           #NewArrivals
                        </h2>
                     </div>
                     <p style={{marginTop: "20px",marginBottom: "30px"}}>
                        Vitae fugiat laboriosam officia perferendis provident aliquid voluptatibus dolorem, fugit ullam sit earum id eaque nisi hic? Tenetur commodi, nisi rem vel, ea eaque ab ipsa, autem similique ex unde!
                     </p>
                     <a href="">
                     Shop Now
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section class="product_section layout_padding"  style={{ cursor: 'pointer' }}>
         <div class="container">
            <div class="heading_container heading_center">
               <h2>
                  Our <span>Category</span>
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
                  <div class="box">
                     <div class="option_container">
                       
                     </div>
                     <div class="img-box">
                     <img src={value.photo} alt="fg" />
                     </div>
                     <div class="detail-box">
                        <h5>
                           {value.category_name}
                        </h5>
                        
                       
                     </div>
                  </div>
               </div>
                     )
                     })
               }
               
              
            </div>
           <Link to={"/categoryfront"}> <div class="btn-box">
               <a >
               View All Category
               </a>
            </div></Link>
         </div>
      </section>

      <section class="subscribe_section"  style={{ cursor: 'pointer' }}>
         <div class="container-fuild">
            <div class="box">
               <div class="row">
                  <div class="col-md-6 offset-md-3">
                     <div class="subscribe_form ">
                        <div class="heading_container heading_center">
                           <h3>Subscribe To Get Discount Offers</h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                        <form action="">
                           <input type="email" placeholder="Enter your email"/>
                           <button>
                           subscribe
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="client_section layout_padding" style={{ cursor: "pointer" }}>
      <div className="container">
        <div className="heading_container heading_center">
          <h2>Customer's Testimonial</h2>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p>Loading testimonials...</p>
          </div>
        ) : userTestimonials.length > 0 ? (
          <div className="swiper-container">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
            >
              {userTestimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="box col-lg-10 mx-auto">
                    <div className="img_container">
                      <div className="img-box">
                        <div className="img_box-inner">
                          <img
                            src={item.photo}
                            alt={item.f_name}
                            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="detail-box">
                      <h5>{item.f_name}</h5>
                      <h6>{item.role}</h6>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p>No testimonials found for this user.</p>
          </div>
        )}
      </div>
    </section>

      <Footer/>
    </div>
  )
}
