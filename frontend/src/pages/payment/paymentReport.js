
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBTableBody,MDBTable,MDBTableHead, MDBBtn, MDBCol, MDBRow} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Navbar from "../adminNav";

function FeedbackReport() {

     const [allVehiclePayment,setallVehiclePayment] = useState([]);
    useEffect(() => {
       axios.get(global.APIUrl+"/payment/allOrderVehiclePayment")
       .then(res => setallVehiclePayment(res.data))
        .catch(error => console.log(error));
    })

    let sumallVehiclePayment = allVehiclePayment.reduce(function(prev, current) {
    return prev + +current.Amount
    }, 0);
   


      

    const [allOrderADVERTISEMENT,setallOrderADVERTISEMENT] = useState([]);
    useEffect(() => {
       axios.get(global.APIUrl+"/payment/allOrderADVERTISEMENT")
       .then(res => setallOrderADVERTISEMENT(res.data))
       .catch(error => console.log(error));
      })

    let sumallOrderADVERTISEMENT = allOrderADVERTISEMENT.reduce(function(prev, current) {
    return prev + +current.Amount
    }, 0);

    const [allOrderBooking,setallOrderBooking] = useState([]);
    useEffect(() => {
       axios.get(global.APIUrl+"/payment/allOrderBooking")
       .then(res => setallOrderBooking(res.data))
       .catch(error => console.log(error));
      })

        let sumallOrderBooking = allOrderBooking.reduce(function(prev, current) {
    return prev + +current.Amount
    }, 0);

    function pdfDownload()
    { 
        var doc = new jsPDF();

        doc.setTextColor(254, 8, 8 );
        doc.text(20, 20, 'Payment Report')
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 40, 'Total Payments : RS.'+sumallVehiclePayment+sumallOrderADVERTISEMENT+sumallOrderBooking)
        doc.text(25, 50, 'Total Vehicle Orderning Payments  : RS.'+sumallVehiclePayment)      
        doc.text(25, 60, 'Total Advertisement Payments  : RS.'+sumallOrderADVERTISEMENT)      
        doc.text(25, 70, 'Total Service Booking Payments  : RS.'+sumallOrderBooking)     
        doc.save('Booking Report.pdf')
    }
 

    return (
    <div class="dashboard-main-wrapper" >
        <Navbar/>
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                     <center>
                          <h2 className="text-uppercase text-black">Payment Report</h2>
                     </center>
                     <div className="text-end mt-5">
                         <a href="PaymentDashboard">
                            <MDBBtn className='btn-sm' style={{ fontSize:'15px', fontWeight:'100',letterSpacing:'2px' }} color='dark'>
                                Back
                            </MDBBtn>
                        </a>&nbsp;&nbsp;&nbsp;
                        <MDBBtn className='btn-sm' onClick={pdfDownload} style={{ fontSize:'15px', fontWeight:'100',letterSpacing:'2px' }} color='danger'>
                                Download
                            </MDBBtn>
                     </div>
                    <MDBRow className="mt-4" id="summery">
                     <MDBCol sm='4'>
             
                         <MDBCard className=" square border-bottom border-5 border-dark alert-primary " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2  pb-4 text-left ms-3 text-uppercase" >
                                <span> 
                                    <b style={{fontSize:'180%'}}>Rs.{sumallVehiclePayment+sumallOrderBooking+sumallOrderADVERTISEMENT}</b>
                                    <br/>&nbsp;Total Income</span>
                            </MDBCardHeader>
                        </MDBCard>
  
                    </MDBCol>
                    <MDBCol sm='4'>
             
                         <MDBCard className=" square border-bottom border-5 border-dark alert-success " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2  pb-4 text-left ms-3 text-uppercase" >
                                <span> 
                                    
                                    <b style={{fontSize:'180%'}}>Rs.{sumallOrderADVERTISEMENT}</b>
                                    <br/>&nbsp;Vehicle Selling Income</span>
                            </MDBCardHeader>
                        </MDBCard>
  
                    </MDBCol>
                    <MDBCol sm='4'>
                 
                         <MDBCard className=" square border-bottom border-5 border-dark alert-warning " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2 pb-4 text-left ms-3 text-uppercase" >
                                <span>
                                    
                                  <b style={{fontSize:'180%'}}>Rs.{sumallOrderBooking}</b>
                                 
                               <br/>&nbsp;Service Booking Income</span>
                            </MDBCardHeader>
                         </MDBCard>
                
                    </MDBCol>
                     <MDBCol sm='4'>
                 
                         <MDBCard className=" square border-bottom border-5 border-dark alert-danger " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2 pb-4 text-left ms-3 text-uppercase" >
                                <span>
                                    
                                     <b style={{fontSize:'180%'}}>Rs.{sumallOrderADVERTISEMENT}</b>
                                 
                               <br/>&nbsp;Advertisement Income</span>
                            </MDBCardHeader>
                         </MDBCard>
                
                    </MDBCol>
                 </MDBRow>

                 </div>
            </div>
        </div>
      </div>
      )
};


export default FeedbackReport;