
import React, { useState , useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon, MDBInput} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Layout from '../../components/Layout';



function OrderDashboard() {
    
    const [searchName,setsearchName] = useState("")
    const [allPayment,setallPayment] = useState([]);

     if(searchName === '' || searchName=== null){
         // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
        axios.get("http://localhost:5000/payment/allOrderPayment")
        .then(res => setallPayment(res.data))
        .catch(error => console.log(error));
        })
     }else{
      
         // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
        axios.get("http://localhost:5000/payment/allOrderPayment/"+searchName)
        .then(res => setallPayment(res.data))
        .catch(error => console.log(error));
        })
     }
   




   

      function Accept(id){
            const status = "Shipped";
            const statusUpdate ={status}
            axios.put("http://localhost:5000/payment/statusPaymentUpdate/"+id,statusUpdate).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Status Updated!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/PaymentDashboard";
                }
            }); 
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Status Not Updated!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

    function Reject( id)
    { 
            const status = "Cancel Order";
            const statusUpdate ={status}
            axios.put("http://localhost:5000/payment/statusPaymentUpdate/"+id,statusUpdate).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Status Updated!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/PaymentDashboard";
                }
            }); 
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Status Not Updated!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
    }

    function View(_id,accountHold,cardNumber,expireDate,ccv,paymentMethod,reason,Amount,userName,paymentTitle,status){
        reactLocalStorage.setObject("viewPayment", [_id,accountHold,cardNumber,expireDate,ccv,paymentMethod,reason,Amount,userName,paymentTitle,status]);
        window.location.href = "/PaymentView";
    }

    function DeletePay(id){
          axios.delete("http://localhost:5000/payment/deletePayment/"+id).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Payment  Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Payment  Not Delete",
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
                          <h2 className="text-uppercase text-black">Order MANAGEMENT</h2>
                     </center>
                     <div className="text-end mt-5">
                      
                         
                         
                         

                         
                       
                     </div>
                     <div className=" pt-1 mt-5">
                        <h6>Search Using Payment Amount</h6>
                        <MDBInput  className="mt-3 bg-white" id='form1' type='text'  onChange={(e) =>{
                            setsearchName(e.target.value);
                            }}/>
                     </div>
                     <h5 className='mt-5' id="Sale">Customer Orders</h5>
                     <MDBTable hover>
                        <MDBTableHead className="bg-dark">
                            <tr>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Payment Id</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Amount</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Date</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Description</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Status</h6></th>
                                <th scope='col' ><h6 className="text-white" style={{fontWeight:'100',letterSpacing:'2px'}}>Action</h6></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {allPayment.map((allPayments,key) => (
                            <tr className="bg-light">
                                <td style={{fontSize:'18px'}}>{allPayments._id}</td>
                                <td style={{fontSize:'18px'}}>RS.{allPayments.Amount}</td>
                                <td style={{fontSize:'18px'}}>{allPayments.createdAt}</td>
                                <td style={{fontSize:'18px'}}>{allPayments.reason}</td>
                                <td style={{fontSize:'18px'}}>{allPayments.status}</td>
                                <td>
                                    <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => Reject(allPayments._id)}><MDBIcon fas icon="times-circle" /></MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='sm' className="shadow-0" color='success'  onClick={() => Accept(allPayments._id)}  ><MDBIcon fas icon="edit" /></MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='sm' className="shadow-0" color='dark'  onClick={() => View(
                                        allPayments._id,
                                        allPayments.accountHold,
                                        allPayments.cardNumber,
                                        allPayments.expireDate,
                                        allPayments.ccv,
                                        allPayments.paymentMethod,
                                        allPayments.reason,
                                        allPayments.Amount,
                                        allPayments.userName,
                                        allPayments.paymentTitle,
                                        allPayments.status
                                        )}  ><MDBIcon fas icon="eye" /></MDBBtn>{''}&nbsp;&nbsp;
                                    <MDBBtn size='sm' className="shadow-0" color='danger' outline onClick={() => DeletePay(allPayments._id)}><MDBIcon fas icon="trash" /></MDBBtn>{''}&nbsp;&nbsp;
                                </td>
                            </tr>
                            ))}
                        </MDBTableBody>
                        </MDBTable>
                        
                 </div>
            </div>
        </div>
      </div>
      </Layout>
      )
};


export default OrderDashboard;