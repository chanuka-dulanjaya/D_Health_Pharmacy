
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

function BrandEdit() {
      var service_center = reactLocalStorage.getObject('service_center');
      const id = service_center[0];

      const [Brand, setBrand] = useState(service_center[1]);
      const [url, setUrl] = useState(service_center[2]);
      const [telephone, setTelephoneOne] = useState(service_center[3]);
   
      const [email, setEmail] = useState(service_center[4]);
     
  
      

      const [image, setImage] = useState('https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/'+service_center[5]);

      function Edit(e){
            e.preventDefault();
            const Service_centerUpdate ={ Brand ,url, telephone , email  }

            axios.put("http://localhost:5000/brands/BrandUpdate/"+id,Service_centerUpdate).then(() =>{

            Swal.fire({  
            title: "Success!",
            text: "Brand Updated!",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
            if (okay) {
                window.location.href = "/brandAdd";
            }
            });

            
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Brand Not Update!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
      }

    // function pdfDownload()
    // { 
    //   var doc = new jsPDF('p', 'pt');
      
    //   doc.setTextColor(254, 8, 8 );
    //   doc.text(20, 20, location + 'Service Center')
    //   doc.addFont('helvetica', 'normal')
    //   doc.setFontSize(12);
    //   doc.setTextColor(3, 3, 3);
    //   doc.text(25, 60, 'Location : '+location)
    //   doc.text(25, 80, 'Address :  '+address)      
    //   doc.text(25, 100, 'Telephone Number :  '+telephone1)      
    //   doc.text(25, 120, 'Telephone Number  : '+telephone2)      
    //   doc.text(25, 140, 'Email  : '+email)         
    //   doc.save(location + 'Service Center.pdf')
    // }


    function pdfDownload(){
        var doc = new jsPDF();
    
        doc.setTextColor(254, 8, 8 );
        doc.text(20, 20, Brand)
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 40, 'Brand Name : '+Brand)
        doc.text(25, 50, 'Brand Url : '+url)
        doc.text(25, 60, 'Brand Telephone : '+telephone)
        doc.text(25, 70, 'Brnad email : '+email)
      
        doc.save(Brand+'.pdf')
    } 

   
      const [emailStatus, setemailStatus] = useState('');

      function set_Email(e) {
        const email_pre = e;
        var atposition=email_pre.indexOf("@");  
        var dotposition=email_pre.lastIndexOf(".");  
        if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email_pre.length){  
                    setemailStatus('InValid Email');
                    
        }else{
                
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
                         <h3 className="text-uppercase">Edit Service Center Details </h3>
                     </center>
                      <MDBRow className='mt-3'>
                        <MDBCol sm='5'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody id="divToPrint">
                               <MDBCardImage src={image} alt='...' fluid />
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='1'></MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody  className="bg-light">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Brand</label>
                                    <input type="text" class="form-control" disabled  value={Brand} onChange={(e) =>{
                                            setBrand(e.target.value);
                                        }} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Url</label>
                                    <input type="text" class="form-control" value={url} onChange={(e) =>{
                                            setUrl(e.target.value);
                                        }} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Telephone Number </label>
                                    <NumberFormat format="0## ### ####" class="form-control" value={telephone} placeholder="071 192 9098" onChange={(e) =>{
                                        setTelephoneOne(e.target.value);
                                    }}/>
                                </div>
                           
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Email</label>
                                    <input type="email" class="form-control" value={email} onChange={(e) =>{
                                            set_Email(e.target.value);
                                        }} />
                                    <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}   >
                                        {emailStatus}
                                    </span>
                                </div>
                                 <div className="text-end">
                                     <button type="button" class="btn btn-dark d-letter-spacing " onClick={Edit} >Edit</button>&nbsp;&nbsp;&nbsp;
                                    {/* <button type="button" class="btn btn-success d-letter-spacing " onClick={pdfDownload} >Print</button>&nbsp;&nbsp;&nbsp; */}
                                     <a href="/brandAdd">
                                        <MDBBtn className='btn-sm' outline style={{ fontSize:'15px', fontWeight:'500',letterSpacing:'2px' }} color='dark'>
                                            Back
                                        </MDBBtn>
                                     </a>
                                     &nbsp;&nbsp;&nbsp;
                                     <button type="button" class="btn btn-dark d-letter-spacing "  onClick={pdfDownload} ><MDBIcon fas icon="download" /></button>
                                  
                             
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


export default BrandEdit;