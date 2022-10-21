import React, { useState , useEffect } from 'react';
import { MDBIcon, MDBCardImage,
 MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol , MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';


import NavBar from '../../components/navbar';


function Buyone() {

    var ImportVehicleOne = reactLocalStorage.getObject('ImportVehicleOne');
    const id = ImportVehicleOne[0];
    const name =  useState(ImportVehicleOne[1]);
    const brand =  useState(ImportVehicleOne[2]);
    const quantity =  useState(ImportVehicleOne[3]);
    const price =  useState(ImportVehicleOne[4]);

    const [oneMedicine,setOneMedicine] = useState([]);
    useEffect(() => {
          axios.get("http://localhost:5000/payment/homePageOneItemView/"+id)
          .then(res => setOneMedicine(res.data))
          .catch(error => console.log(error));
         
    });

  

     function order()
     {
            const serviceType1= "Order";
            const amount =  parseInt(price)*0.05;
            window.location.href = "/Payment?id="+serviceType1+"&Amount="+amount+"&paymentTitle=Medicine Order";
     }
    
    return (
    <div>
       
        <NavBar/>
        <center>
             
                <div class="row container-fluid" style={{marginBottom:'20%', marginTop:'5%'}}>
                <div class="col-sm-6">
                    <div class="card shadow-0">
                    <div class="card-body">
                        
                    <MDBCardImage style={{marginTop:'5%', width:'80%'}} src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+oneMedicine.image}   />
                       
                    </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card  shadow-0">
                    <div class="card-body text-left">
                        <h2 class="card-title text-dark text-capitalize"><br/></h2>
                        <div className="ml-3 mt-2">
                            <h1 className="text-danrk text-capitalize" style={{lineHeight:'60%' ,textAlign:'left'}}>{name}</h1><br></br>
                            <h4 className="text-muted" style={{textAlign:'left'}} >Rs.{price}.00</h4>
                            <br/>
                            <p>
                                <table style={{width:'75%',textAlign:'left'}} >
                                    <tr>
                                        <td className="fw-bold h6" ><MDBIcon fas icon="angle-right" /> Brand :</td>
                                        <td>{brand}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold h6"><MDBIcon fas icon="angle-right" /> Action Date :</td>
                                        <td>{brand}</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold h6"><MDBIcon fas icon="angle-right" /> Qty :</td>
                                        <td>{quantity}</td>
                                    </tr>
                                  
                                 
                                
                                  
                                    <tr className="mt-5">
                                        <td className="fw-bold h6"></td>
                                        <td><br/>
                                            <MDBBtn className='mx-2 btn-lg shadow-0 d-letter-spacing' color='dark' onClick={order}>
                                                 Buy
                                            </MDBBtn>
                                            <a href="/">
                                                <MDBBtn className='btn-lg' style={{ fontSize:'13px', fontWeight:'light'}} outline color='dark'>
                                                Back
                                                </MDBBtn>{' '}&nbsp;&nbsp;
                                            </a>
                                        </td>
                                    </tr>
                                        
                                  
                                </table>
                            </p>
                            
                        </div>
                    </div>
                    </div>
                    
                </div>
               
                </div>
            
           
            </center>
  
    </div>
    )
};

export default Buyone;