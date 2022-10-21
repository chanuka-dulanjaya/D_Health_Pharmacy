import React, { useState , useEffect } from 'react';
import { MDBIcon, MDBCardImage,
 MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol , MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';

import NumberFormat from 'react-number-format';


import NavBar from '../../components/navbar';
import { useSelector } from 'react-redux';

function UserPayment() {
    const {user} = useSelector((state)=>state.user)
   const [accountHold,setCardDHolder] = useState("");
   const [cardNumber,setCardDNumber] = useState("");
   const [expireDate,setExpireDate] = useState("");
   const [ccv,setCCV] = useState("");
   const [paymentMethod,setMethod] = useState("");

   const search = window.location.search;
   const params = new URLSearchParams(search);
   const reason = params.get('id');
   const Amount = params.get('Amount');
   const userName =  user?.name
   const paymentTitle =  params.get('paymentTitle');

    var ImportVehicleOne = reactLocalStorage.getObject('ImportVehicleOne');
    const brand =  useState(ImportVehicleOne[3]);
    const model =  useState(ImportVehicleOne[4]);

   function pay(e)
   {
        e.preventDefault();
        const addPayment ={ accountHold, cardNumber, expireDate, ccv, paymentMethod, reason, Amount, userName, paymentTitle, brand, model}

        axios.post("http://localhost:5000/payment/addPayment",addPayment).then(() =>{

        Swal.fire({  
          title: "Success!",
          text: "Payment Success!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"}).then(okay => {
          if (okay) {
              window.location.href = "/admin";
          }
        });

        
    }).catch((err)=>{

        Swal.fire({  
        title: "Error!",
        text: "Payment Not Success",
        icon: 'error',
        confirmButtonText: "OK",
        type: "success"})
    })
   }

 

    return (
    <div>
        <div className="pt-1 pb-1" style={{backgroundColor:'#F4F4F4'}}>
            <center>
                <small style={{fontSize:'14px', letterSpacing:'2px'}} className="text-muted text-capitalize">The Largest Autobile Service Hub In The Sri Lanka</small>
            </center>
        </div>
        <NavBar/>
        <div className='bg-image' >
            <img src='https://img.freepik.com/free-vector/customer-online-review-rating-feedback-set_124507-8052.jpg?size=626&ext=jpg' className='img-fluid' alt='Sample' />
            <div className='mask' style={{ backgroundColor: '#292929' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize:'55px', letterSpacing:'2px'}}>Payment</p>
                </div>
            </div>
        </div>
        <br/>
        <br/>
         <div class="row container-fluid" style={{marginTop:'7%', marginBottom:'26%'}}>
            <div class="col-sm-3">
               <div class="card shadow-0">
                <div class="card-body text-left">

                </div>
                </div>
            </div>
             <div class="col-sm-6">
               <div class="card shadow-0 bg-light">
                <div class="card-body text-left" style={{padding:'8% 12% 15% 12%'}}>
                    <center>
                        <div className="alert alert-danger" style={{textTransform:'capitalize'}}>
                           We charge Rs.{Amount} for one {paymentTitle}. 
                        </div>
                    </center>
                      <div className="mb-3 mt-2">
                            <label  class="form-label h5">Account Holder Name </label>
                            <input type="text" class="form-control" id="customFile" onChange={(e) =>{
                            setCardDHolder(e.target.value);
                         }}/>
                      </div>
                      <div className="mb-3">
                         <label  class="form-label h5">Card Number </label>
                         <NumberFormat format="#### #### #### ####" class="form-control" placeholder="1111 1111 1111 1111"  onChange={(e) =>{
                            setCardDNumber(e.target.value);
                         }}/>
                      </div>
                      <div className="mb-3">
                            <label  class="form-label h5">Expire Date </label>
                            <NumberFormat format="##/##" class="form-control" placeholder="MM/YY"  onChange={(e) =>{
                            setExpireDate(e.target.value);
                         }}/>
                      
                      </div>
                      <div className="mb-3">
                            <label  class="form-label h5">CCV </label>
                          <NumberFormat format="###" class="form-control" placeholder="888"  onChange={(e) =>{
                            setCCV(e.target.value);
                         }}/>
                      </div>
                      <div className="mb-3">
                            <label  class="form-label h5">Payment Method </label>
                            <select class="form-select" id="customFile" onChange={(e) =>{
                            setMethod(e.target.value);
                         }}>
                                <option>Master Card</option>
                                <option>Visa Card</option>
                                <option>Credit Card</option>
                                <option>Google Pay</option>
                            </select>
                      </div>
                      <div class="d-grid gap-2">
                         <button class="btn btn-dark d-letter-spacing"  onClick={pay} type="button">Pay</button>
                      </div>
                </div>
                </div>
            </div>
             <div class="col-sm-3">
               <div class="card shadow-0">
                <div class="card-body text-left">

                </div>
                </div>
            </div>
         </div>
        
    </div>
    )
};

export default UserPayment;