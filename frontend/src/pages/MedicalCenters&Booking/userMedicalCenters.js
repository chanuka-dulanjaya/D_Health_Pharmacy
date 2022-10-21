import React, { useState , useEffect } from 'react';
import { MDBIcon, MDBCardImage,
 MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol , MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Layout from '../../components/Layout';


function UserMedicalCenters() {
    const [ServiceCenters,setServiceCenter] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/medicalCenter/allMedical_center")
        .then(res => setServiceCenter(res.data))
        .catch(error => console.log(error));
        });
        
    return (
        <Layout>
    <div>
     
      
        <div className='bg-image' >
            <img src='https://img.freepik.com/free-vector/customer-online-review-rating-feedback-set_124507-8052.jpg?size=626&ext=jpg' className='img-fluid' alt='Sample' />
            <div className='mask' style={{ backgroundColor: '#292929' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize:'55px', letterSpacing:'2px'}}>Medical Centers</p>
                </div>
            </div>
        </div>
        <br/>
        <br/>
        <center>
         <div class="row container-fluid" style={{marginTop:'7%', marginBottom:'26%'}}>
             {ServiceCenters.map((ServiceCenter,key) => (
                <div class="col-sm-4">
                    <div class="card bg-light">
                        
                        <div class="card-body ">
                            <h4 class="card-title text-uppercase">{ServiceCenter.location} - Medical Center</h4>
                            <div className=" text-left" style={{ marginLeft:'22%'}}>
                                <p style={{ fontSize:'18px'}}>
                                    Address - {ServiceCenter.address}<br/>
                                    Telephone 1 - {ServiceCenter.telephone1}<br/>
                                    Telephone 2 - {ServiceCenter.telephone2}<br/>
                                
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            </center>

    </div>
    </Layout>
    )
};

export default UserMedicalCenters;