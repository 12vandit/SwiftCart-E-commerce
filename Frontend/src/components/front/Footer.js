import React from 'react'

export default function Footer() {
  return (
    <div>
         <footer>
         <div className="container"  style={{ cursor: 'pointer' }}>
            <div className="row">
               <div className="col-md-4">
                   <div className="full">
                      <div className="logo_footer">
                        <a href="#"><img width="100px"  src="images/logo.png" alt="#" /></a>
                      </div>
                      <div className="information_f">
                        <p><strong>ADDRESS:</strong> ganesh vatika,nangal jaisa bohara jaipur, Rajasthan</p>
                        <p><strong>TELEPHONE:</strong> +91 8949521905</p>
                        <p><strong>EMAIL:</strong> ritesh12@gmail.com</p>
                      </div>
                   </div>
               </div>
               <div className="col-md-8">
                  <div className="row">
                  <div className="col-md-7">
                     <div className="row">
                        <div className="col-md-6">
                     <div className="widget_menu">
                        <h3>Menu</h3>
                        <ul>
                           <li><a href="#">Home</a></li>
                           <li><a href="#">About</a></li>
                           <li><a href="#">Services</a></li>
                           <li><a href="#">Testimonial</a></li>
                           <li><a href="#">Blog</a></li>
                           <li><a href="#">Contact</a></li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="widget_menu">
                        <h3>Account</h3>
                        <ul>
                           <li><a href="#">Account</a></li>
                           <li><a href="#">Checkout</a></li>
                           <li><a href="#">Login</a></li>
                           <li><a href="#">Register</a></li>
                           <li><a href="#">Shopping</a></li>
                           <li><a href="#">Widget</a></li>
                        </ul>
                     </div>
                  </div>
                     </div>
                  </div>     
                  <div className="col-md-5">
                     <div className="widget_menu">
                        <h3>Newsletter</h3>
                        <div className="information_f">
                          <p>Subscribe by our newsletter and get update protidin.</p>
                        </div>
                        <div className="form_sub">
                           <form>
                              <fieldset>
                                 <div className="field">
                                    <input type="email" placeholder="Enter Your Mail" name="email" />
                                    <input type="submit" value="Subscribe" />
                                 </div>
                              </fieldset>
                           </form>
                        </div>
                     </div>
                  </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
    </div>
  )
}
