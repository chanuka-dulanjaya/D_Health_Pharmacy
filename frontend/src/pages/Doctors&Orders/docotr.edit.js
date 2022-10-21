
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardImage} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';

import NumberFormat from 'react-number-format';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import NavBar from '../../components/navbar';

function DoctorEdit() {
      var service_center = reactLocalStorage.getObject('service_center');
      const id = service_center[0];

      const [name, setName] = useState(service_center[1]);
      const [email, setEmail] = useState(service_center[2]);
      const [telephone1, setTelephoneOne] = useState(service_center[3]);
      const [Category, setCategory] = useState(service_center[4]);
      const [Salary, setSalary] = useState(service_center[5]);
      const [address, setiAddress] = useState(service_center[6]);

      function Edit(e){
            e.preventDefault();
            const DoctorUpdate ={ name , email , telephone1 , Category , Salary, address }

            axios.put("http://localhost:5000/addDoctor/docUpdate/"+id,DoctorUpdate).then(() =>{

            Swal.fire({  
            title: "Success!",
            text: "Doctor data Updated!",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
            if (okay) {
                window.location.href = "/DocAdd";
            }
            });

            
        }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text: "Doctor data Not Update!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
      }

      const [doctors,setDoctors] = useState([])

      useEffect(() => {
        axios.get("http://localhost:5000/addDoctor/allDoctors")
        .then(res => setDoctors(res.data))
        .catch(error => console.log(error));
        },[]);

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
    <div class="dashboard-main-wrapper" >
        <NavBar/>
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
                                    <label for="exampleFormControlInput1" class="form-label h6">Doctor Name</label>
                                    <input type="text" class="form-control" placeholder="Enter Location" value={name} onChange={(e) =>{
                                            setName(e.target.value);
                                        }} />
                                </div>


                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Email</label>
                                    <input type="email" class="form-control" value={email}  onChange={(e) =>{
                                            setEmail(e.target.value);
                                        }} />
                                    <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}  className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`} >
                                        {emailStatus}
                                    </span>
                                </div>


                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Telephone Number 1</label>
                                    <NumberFormat format="0## ### ####" class="form-control"  placeholder="0## ### ## ##" value={telephone1} onChange={(e) =>{
                                                setTelephoneOne(e.target.value);
                                    }}/>
                                   
                                </div>

                                <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Doctor specialize type</label>
                                                                <select class="form-select" aria-label="Default select example" style={{fontSize:"17px"}} onChange={(e) => {
                                                                    setCategory(e.target.value);
                                                                }}>
                                                                    <option selected>Select type</option>
                                                                    <option value="Anesthesiologists">Anesthesiologists</option>
                                                                    <option value="Cardiologists">Cardiologists</option>
                                                                    <option value="Dermatologists">Dermatologists</option>
                                                                </select>
                                                            </div>


                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Doctor Name</label>
                                    <input type="text" class="form-control" placeholder="Enter Location" value={Salary} onChange={(e) =>{
                                            setSalary(e.target.value);
                                        }} />
                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label h6">Address</label>
                                    <input type="text" class="form-control" placeholder="Enter Address" value={address} onChange={(e) =>{
                                            setiAddress(e.target.value);
                                        }} />
                                </div>
                               
                                 <div className="text-end">
                                     <button type="button" class="btn btn-dark d-letter-spacing " onClick={Edit} >Edit</button>&nbsp;&nbsp;&nbsp;
                                     {/* <button type="button" class="btn btn-success d-letter-spacing " onClick={pdfDownload} >Print</button>&nbsp;&nbsp;&nbsp; */}
                                     <a href="/DocAdd">
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
      )
};


export default DoctorEdit;