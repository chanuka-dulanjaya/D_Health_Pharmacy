import Layout from 'antd/lib/layout/layout'
import axios from 'axios'
import { MDBCardImage, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'
import Footer from '../components/footer'
import NavBar from '../components/navbar'

function Home() {
 
  const [Medicines,setallMedicine] = useState([]);
  useEffect(() => {
        axios.get("http://localhost:5000/medicine_add/allMedicines")
        .then(res => setallMedicine(res.data))
        .catch(error => console.log(error));
      },[]);

  // function publishAdd() {

  //     const tel = sessionStorage.getItem('user_name');
  //     if (tel === null) {
  //         Swal.fire({
  //             title: "Error!",
  //             text: "To access web site, First of all you must fill login form.",
  //             icon: 'error',
  //             confirmButtonText: "OK",
  //             type: "success"
  //         }).then(okay => {
  //             if (okay) {
  //                 window.location.href = "/UserLogin";
  //             }
  //         });
  //     } else {
  //         window.location.href = "/UserViewAdvertisement";
  //     }

  // }


  function vehicleView(_id,name,brand,quantity,price){
      reactLocalStorage.setObject("ImportVehicleOne", [_id,name,brand,quantity,price]);
      window.location.href = "/buyOne";
  }


  const [brands,setBrands] = useState([]);
    

  useEffect(() => {
      axios.get("http://localhost:5000/brands/allBrands")
      .then(res => setBrands(res.data))
      .catch(error => console.log(error));
      },[]);

  return (
    <>
    <NavBar/>
    <section className="container mt-5 pt-5 pb-5 mb-5">
                <h2 className="text-uppercase text-center" style={{ color: '#19011C' }}>All Products</h2>
                <div className="container">
                    <MDBRow className="mt-4">
                     
                        <div class="row container-fluid mt-4"  style={{ marginBottom:'26%'}}>
                        <div class="row mt-3">
                      
                      {Medicines.map((Medicine,key) => (
                      <div class="col-sm-3">
                          <div class="card">
                           <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+Medicine.image} class="card-img-top" alt="..."/>
                          <div class="card-body text-left">
                              <h5 class="card-title  h4">{Medicine.name} - {Medicine.brand}</h5>
                              <div className="ms-2 mb-4">
                                <h6 class="card-text text-danger">Price : RS.{Medicine.price}</h6>
                                <h6 class="card-text text-danger">Quantity : {Medicine.quantity}</h6>
                                <h6 class="card-text text-danger">Name : {Medicine.name}</h6>
                              </div>
                              <div className="text-end">
                                    <button type="button" class="btn btn-outline-dark d-letter-spacing " style={{fontSize:"14px"}} onClick={() => vehicleView( Medicine._id, Medicine.name, Medicine.brand, Medicine.quantity,Medicine.price)} >Buy</button>&nbsp;&nbsp;&nbsp;
                                    
                              </div>
                          </div>
                          </div>
                      </div>
                      ))}
                      </div>
            </div>
                        
                        
                        
                        
                    </MDBRow>
  
                </div>
            </section>


            <section className="container mt-5 pt-5 pb-5 mb-5">
                <h2 className="text-uppercase text-center" style={{ color: '#19011C' }}>Best Brands</h2>
                <div className="container">
                    <MDBRow className="mt-4">
                    
                     

                        {brands.map((brand,key) => (
                                         <MDBCol sm='3'>
                                         <a href={brand.url}>
                                             <div className="shopBox">
                                                 <MDBCardImage position='top' src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+brand.image}  height="200" width="500" />
                                                 
                                             </div>
                                         </a>
                                     </MDBCol>
                                          
                                     ))}
                   
                    


                    </MDBRow>
                   

                </div>
            </section>
            <Footer/>
    </>
     
   
  )
}

export default Home