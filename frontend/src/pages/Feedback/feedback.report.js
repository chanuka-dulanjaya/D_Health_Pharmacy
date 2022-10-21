
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBTableBody,MDBTable,MDBTableHead, MDBBtn, MDBCol, MDBRow} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Layout from '../../components/Layout';


function FeedbackReport() {

    const [CountFeedbacksPositive,allCountFeedbackPositive] = useState([]);
    useEffect(() => {
          axios.get("http://localhost:5000/feedback/allFeedbackPositive")
          .then(res => allCountFeedbackPositive(res.data))
          .catch(error => console.log(error));
    });

    const [CountFeedbacks,allCountFeedback] = useState([]);
    useEffect(() => {
          axios.get("http://localhost:5000/feedback/allFeedback")
          .then(res => allCountFeedback(res.data))
          .catch(error => console.log(error));
    });

    const [FeedbacksNegative,setFeedbackNegative] = useState([]);
    useEffect(() => {
          axios.get("http://localhost:5000/feedback/allFeedbackNegative")
          .then(res => setFeedbackNegative(res.data))
          .catch(error => console.log(error));
    });

    function pdfDownload()
    { 
        var todayDate = new Date().toISOString().slice(0, 10);
        var doc = new jsPDF({
            orientation: 'p',
            unit: 'pt',
            format: 'a4'
        });

        doc.html(document.querySelector('#summery'), {
            callback: function (doc) {
                doc.save('Feedback Report.pdf');
            },
           
            x: 12,
            y: 12,
            html2canvas: {
                scale: 0.3, 
                width: 4500 
            },
        });
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
                          <h2 className="text-uppercase text-black">Feedback Report</h2>
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
                    <MDBRow className="mt-4" id="summery">
                     <MDBCol sm='4'>
             
                         <MDBCard className=" square border-bottom border-5 border-dark alert-primary " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2  pb-4 text-left ms-3 text-uppercase" >
                                <span> 
                                    
                                    <b style={{fontSize:'180%'}}>{CountFeedbacks.length}</b>
                                    <br/>&nbsp;All Feedbacks</span>
                            </MDBCardHeader>
                        </MDBCard>
  
                    </MDBCol>
                    <MDBCol sm='4'>
             
                         <MDBCard className=" square border-bottom border-5 border-dark alert-danger " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2  pb-4 text-left ms-3 text-uppercase" >
                                <span> 
                                    
                                    <b style={{fontSize:'180%'}}>{FeedbacksNegative.length}</b>
                                    <br/>&nbsp;Negative Feedbacks</span>
                            </MDBCardHeader>
                        </MDBCard>
  
                    </MDBCol>
                    <MDBCol sm='4'>
                 
                         <MDBCard className=" square border-bottom border-5 border-dark alert-success " style={{boxShadow:'2px 3px 5px #BBBBBB'}}>
                            
                            <MDBCardHeader className=" fw-bold mt-2 h4 pl-2 pb-4 text-left ms-3 text-uppercase" >
                                <span>
                                    
                                    <b style={{fontSize:'180%'}}>{CountFeedbacksPositive.length}</b>
                                 
                               <br/>&nbsp;Positive Feedbacks</span>
                            </MDBCardHeader>
                         </MDBCard>
                
                    </MDBCol>
                 </MDBRow>

                 </div>
            </div>
        </div>
      </div>
      </Layout>
      )
};


export default FeedbackReport;