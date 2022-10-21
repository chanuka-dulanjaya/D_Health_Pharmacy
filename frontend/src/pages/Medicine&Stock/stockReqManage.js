import React, { useState , useEffect } from 'react';
import {  MDBBtn} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';

import Layout from '../../components/Layout';


function StockReqManage() {
 
      const [brands, setBrands] = useState([]);
      useEffect(() => {
        axios.get("http://localhost:5000/brands/allBrands")
        .then(res => setBrands(res.data))
        .catch(error => console.log(error));
        },[]);
        

        


         const [MedicinesReqs,setallMedicineReq] = useState([]);
   

         useEffect(() => {
            axios.get("http://localhost:5000/medicine_add/allMedicineRequest")
            .then(res => setallMedicineReq(res.data))
            .catch(error => console.log(error));
          },[]);

    function AvailableactionStatus(id)
    { 
        const status = "Available";
        const statusUpdate ={status}
        axios.put("http://localhost:5000/medicine_add/medicineAvailability/"+id, statusUpdate ).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Medicine  "+status,
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.reload();
                    }
                });

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Error In System",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }
       
     function UnavailableactionStatus(id)
    { 
        const status = "Unavailable";
        const statusUpdate ={status}
        axios.put("http://localhost:5000/medicine_add/medicineAvailability/"+id, statusUpdate ).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Medicine  "+status,
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.reload();
                    }
                });

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Error In System",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }

   

    return (
        <Layout>
    <div class="dashboard-main-wrapper" >
       
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     <center>
                         <h1 className="text-uppercase">Medicine Request</h1>
                     </center>
                      <div className="text-end mt-4">
                         <a href="/stockDash">
                            <MDBBtn className='btn-sm' style={{ fontSize:'15px', fontWeight:'100',letterSpacing:'2px' }} color='dark'>
                                Back
                            </MDBBtn>
                        </a>
                     </div>
                        <div className="text-end mt-5">
                     
                      
                        <div class="row">
                        {MedicinesReqs.map((MedicinesReq,key) => (
                        <div class="col-sm-4">
                            <div class="card" style={{textAlign: "left"}}>
                            <div class="card-body text-left">
                                <h5 class="card-title text-dark h2">We Want {MedicinesReq.brand}</h5>
                                <div className="ms-2 mb-4" style={{fontSize:"13px"}}>
                                  <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Medcine Name : {MedicinesReq.name}</h6>
                                  <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Medcine quantity : {MedicinesReq.quantity}</h6>
                                  <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Date : : {MedicinesReq.date}</h6>


                                  <hr/>
                                  <h6 class="card-text text-success" style={{fontSize:"18px"}}>Status : {MedicinesReq.status}</h6>
                                </div>
                                <div className="text-end">
                                      <button type="button" class="btn btn-success d-letter-spacing shadow-0 " style={{fontSize:"15px"}} onClick={() => AvailableactionStatus(MedicinesReq._id)}  >Available</button>&nbsp;
                                      <button type="button" class="btn btn-danger d-letter-spacing  shadow-0" style={{fontSize:"15px"}}  onClick={() => UnavailableactionStatus(MedicinesReq._id)}  >Unavailable</button>&nbsp;&nbsp;
                                </div>
                            </div>
                            </div>
                        </div>
                        ))}
                        </div>
                     </div>
                 </div>
            </div>
        </div>
      </div>
      </Layout>
      )
};


export default StockReqManage;