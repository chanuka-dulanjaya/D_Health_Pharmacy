
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBTableBody,MDBTable,MDBTableHead, MDBBtn, MDBCol, MDBRow} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Layout from '../../components/Layout';


function OrderView() {

    var viewPayment = reactLocalStorage.getObject('viewPayment');
    const paymentId = viewPayment[0];
    const [accountHold,setaccountHold] = useState(viewPayment[1]);
    const [cardNumber,setcardNumber] = useState(viewPayment[2]);
    const [expireDate,setexpireDate] = useState(viewPayment[3]);
    const [ccv,setccv] = useState(viewPayment[4]);
    const [paymentMethod,setpaymentMethod] = useState(viewPayment[5]);
    const [reason,setreason] = useState(viewPayment[6]);
    const [Amount,setAmount] = useState(viewPayment[7]);
    const [userName,setuserName] = useState(viewPayment[8]);
    const [paymentTitle,setpaymentTitle] = useState(viewPayment[9]);
    const [status,setstatus] = useState(viewPayment[10]);

    function pdfDownload()
    { 
       var doc = new jsPDF('p', 'pt');
      
      doc.setTextColor(254, 8, 8 );
      doc.text(20, 20, paymentTitle)
      doc.addFont('helvetica', 'normal')
      doc.setFontSize(12);
      doc.setTextColor(3, 3, 3);
      doc.text(25, 60, 'Payment ID : '+paymentId)
      doc.text(25, 80, 'Account Holder : '+accountHold)      
      doc.text(25, 100, 'Account Number : '+cardNumber)      
      doc.text(25, 120, 'Expire Date : '+expireDate)      
      doc.text(25, 140, 'CCV '+ccv)      
      doc.text(25, 160, 'Payment Method : '+paymentMethod)      
      doc.text(25, 180, 'Reason '+reason)      
      doc.text(25, 200, 'Amount '+Amount)      
      doc.text(25, 220, 'Status '+status)      
      doc.save(paymentId+' Payment Report.pdf')
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
                          <h2 className="text-uppercase text-black">Payment View</h2>
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
                    <MDBRow className="mt-5">
                     <MDBCol sm='3'></MDBCol>
                    <MDBCol sm='6'  id="summery">
                   
                      <table width='80%'>
                          <tr>
                              <td>
                                  <h5>Payment Id</h5>
                              </td>
                              <td>
                                  <p style={{fontWeight:'600'}} className="text-capitalize">{paymentId}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Account Holder</h5>
                              </td>
                              <td>
                                  <p style={{fontWeight:'600'}} className="text-capitalize">{accountHold}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Card Number</h5>
                              </td>
                              <td>
                                  <p style={{fontWeight:'600'}} className="text-capitalize">{cardNumber}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Expire Date</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{expireDate}</p>
                              </td>
                          </tr>
                            <tr>
                              <td>
                                  <h5>CCV</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{ccv}</p>
                              </td>
                          </tr>
                            <tr>
                              <td>
                                  <h5>Payment Method</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{paymentMethod}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Reson</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{reason}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Amount</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{Amount}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>User Name</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{userName}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Status</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}} className="text-capitalize">{status}</p>
                              </td>
                          </tr>
                      </table>
                         
                    </MDBCol>
                    <MDBCol sm='3'></MDBCol>
                 </MDBRow>

                 </div>
            </div>
        </div>
      </div>
      </Layout>
      )
};


export default OrderView;