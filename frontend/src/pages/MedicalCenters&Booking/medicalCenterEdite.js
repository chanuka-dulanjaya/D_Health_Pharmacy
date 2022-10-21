
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardImage} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';

import NumberFormat from 'react-number-format';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Layout from '../../components/Layout';

function ChanelCenterEdit() {
      var service_center = reactLocalStorage.getObject('service_center');
      const id = service_center[0];

      const [location, setLocation] = useState(service_center[1]);
      const [address, setAddress] = useState(service_center[2]);
      const [telephone1, setTelephoneOne] = useState(service_center[3]);
      const [telephone2, setTelephoneTwo] = useState(service_center[4]);
      const [email, setEmail] = useState(service_center[6]);
      const [image, setImage] = useState('https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/'+service_center[5]);

      function Edit(e){
            e.preventDefault();
            const Service_centerUpdate ={ address , telephone1 , email , telephone2 }

            axios.put("http://localhost:5000/medicalCenter/Medical_centerUpdate/"+id,Service_centerUpdate).then(() =>{

            Swal.fire({  
            title: "Success!",
            text: "Medical Center Updated!",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
            if (okay) {
                window.location.href = "/medCenterAdd";
            }
            });

            
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Medical Center Not Update!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
      }

    function pdfDownload()
    { 
      var doc = new jsPDF('p', 'pt');
      
      doc.setTextColor(254, 8, 8 );
      doc.text(20, 20, location + 'Channel Center')
      doc.addFont('helvetica', 'normal')
      doc.setFontSize(12);
      doc.setTextColor(3, 3, 3);
      doc.text(25, 60, 'Address : '+address)  
      doc.text(25, 100, 'Telephone Number 1:  '+telephone1)      
      doc.text(25, 120, 'Telephone Number  2: '+telephone2)      
      doc.text(25, 140, 'Email  : '+email)         
      doc.save(location + 'Channel Center.pdf')
    }

    const [isValidCFpassword, setIsValidCfpassword] = useState(false);
      const [emailStatus, setemailStatus] = useState('');

      function set_Email(e) {
        const email_pre = e;
        var atposition=email_pre.indexOf("@");  
        var dotposition=email_pre.lastIndexOf(".");  
        if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email_pre.length){  
                    setemailStatus('InValid Email');
                    setIsValidCfpassword(false);
        }else{
                    setIsValidCfpassword(true);
                    setemailStatus('Valid Email');
            }   

          setEmail(e); 
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
                         <h3 className="text-uppercase">Edit Medical Center Details </h3>
                     </center>
                      <MDBRow className='mt-3'>
                     
                        <MDBCol sm='6'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody  className="bg-light">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Location</label>
                                    <input type="text" class="form-control"   value={location} onChange={(e) =>{
                                            setLocation(e.target.value);
                                        }} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Address</label>
                                    <input type="text" class="form-control" value={address} onChange={(e) =>{
                                            setAddress(e.target.value);
                                        }} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Telephone Number 1</label>
                                    <NumberFormat format="0## ### ####" class="form-control" value={telephone1} placeholder="071 192 9098" onChange={(e) =>{
                                        setTelephoneOne(e.target.value);
                                    }}/>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Telephone Number 2</label>
                                     <NumberFormat format="0## ### ####" class="form-control" value={telephone2} placeholder="071 192 9098" onChange={(e) =>{
                                        setTelephoneTwo(e.target.value);
                                    }}/>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Email</label>
                                    <input type="email" class="form-control" value={email} onChange={(e) =>{
                                            set_Email(e.target.value);
                                        }} />
                                    <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                                        {emailStatus}
                                    </span>
                                </div>
                                 <div className="text-end">
                                     <button type="button" class="btn btn-dark d-letter-spacing " onClick={Edit} >Edit</button>&nbsp;&nbsp;&nbsp;
                                     <button type="button" class="btn btn-success d-letter-spacing " onClick={pdfDownload} >Print</button>&nbsp;&nbsp;&nbsp;
                                     <a href="/medCenterAdd">
                                        <MDBBtn className='btn-sm' outline style={{ fontSize:'15px', fontWeight:'500',letterSpacing:'2px' }} color='dark'>
                                            Back
                                        </MDBBtn>
                                     </a>
                                 </div>
                            </MDBCardBody>
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


export default ChanelCenterEdit;