
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBTableBody,MDBTable,MDBTableHead, MDBBtn, MDBCol, MDBRow} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Layout from '../../components/Layout';


function FeedbackView() {

    var customerFeedback = reactLocalStorage.getObject('customerFeedback');
    const feedbackId = customerFeedback[0];

    const [Feedbacks,setAllFeedback] = useState([]);
    axios.get("http://localhost:5000/feedback/oneFeedback/"+feedbackId)
       .then(res => setAllFeedback(res.data))
       .catch(error => console.log(error));
   

    function pdfDownload()
    { 
        var doc = new jsPDF('p', 'pt');
        doc.setTextColor(254, 8, 8 );
        doc.text(20, 20, "Feedback")
        doc.text(25, 30, '---------------------------')
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(20, 50, "Start "+Feedbacks[0].start)
        doc.text(20, 70, "User Name "+Feedbacks[0].username)
        doc.text(20, 90, "Feedback Type "+Feedbacks[0].FeedbackType)
        doc.text(20, 110, "About Feedback "+Feedbacks[0].FeedBackAbout)
        doc.text(20, 120, "Description "+Feedbacks[0].FeedBackAbout)
        doc.setFontSize(11);
        doc.text(20, 130, "Description "+Feedbacks[0].Feedback)
        doc.save('Feedback.pdf')
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
                          <h2 className="text-uppercase text-black">Feedback View</h2>
                     </center>
                     <div className="text-end mt-5">
                         <a href="/feedbackDash">
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
                    {Feedbacks.map((Feedback,key) => (
                      <table width='80%'>
                          <tr>
                              <td>
                                  <h5>User Name</h5>
                              </td>
                              <td>
                                  <p style={{fontWeight:'600'}}>{Feedback.username}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Stars</h5>
                              </td>
                              <td>
                                  <p style={{fontWeight:'600'}}>{Feedback.start} Stars</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>Feedback Type</h5>
                              </td>
                              <td>
                                  <p style={{fontWeight:'600'}}>{Feedback.FeedbackType}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5>About Feedback</h5>
                              </td>
                              <td>
                                 <p style={{fontWeight:'600'}}>{Feedback.FeedBackAbout}</p>
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <h5><br/><br/><u>Description</u></h5>
                              </td>
                              <td>
                                 
                              </td>
                          </tr>
                           <tr>
                              <td>
                                  <p>{Feedback.Feedback}</p>
                              </td>
                          </tr>
                      </table>
                         ))}
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


export default FeedbackView;