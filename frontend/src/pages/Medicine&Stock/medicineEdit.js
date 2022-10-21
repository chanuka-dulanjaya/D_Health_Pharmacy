
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';

import jsPDF from 'jspdf';
import NumberFormat from 'react-number-format';
import Layout from '../../components/Layout';

function MedicineEdit() {
    var importVehicleEdit = reactLocalStorage.getObject('importVehicleEdit');
    const id = importVehicleEdit[0];
    const [name, setName] = useState(importVehicleEdit[1]);
    const [date, setDate] = useState(importVehicleEdit[3]);
    const [brand, setBrand] = useState(importVehicleEdit[2]);
    const [price, setPrice] = useState(importVehicleEdit[4]);
    const [description, setDescription] = useState(importVehicleEdit[5]);
    const [quantity, setQuantity] = useState(importVehicleEdit[6]);
    
    
    
    
   
    
    


     function vehicleUpdate(e){
        e.preventDefault();
        const editVehicle ={ name, price, brand, date, description, quantity}

        axios.put("http://localhost:5000/medicine_add/MedicineUpdate/"+id,editVehicle).then(() =>{
            Swal.fire({  
                title: "Medicine Details Update Success!",
                text: "Medicine Updated",
                icon: 'success',
                confirmButtonText: "success",
                confirmButtonColor: '#8a0a0a',
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/stockDash";
                }
            });

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Medicine Not Updated",
                icon: 'error',
                confirmButtonText: "success",
                confirmButtonColor: '#8a0a0a',
                type: "success"})
        })
    }

     function generatePDF(){
        var doc = new jsPDF();

        doc.setTextColor(254, 8, 8 );
        doc.text(20, 20, brand+' - '+name)
        doc.addFont('helvetica', 'normal')
        doc.setFontSize(12);
        doc.setTextColor(3, 3, 3);
        doc.text(25, 40, 'Medicine Name : '+name)
        doc.text(25, 50, 'Medicine Brand : '+brand)
        doc.text(25, 60, 'Medicine Date : '+date)
        doc.text(25, 70, 'Medicine price : '+price)
        doc.text(25, 80, 'Medicine quantity : '+quantity)
        doc.text(25, 90, 'Medicine description : '+description)
        doc.save(brand+'.pdf')
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
                         <h1 className="text-uppercase">Update {name} Details </h1>
                     </center>
                     <div className="text-end mt-5">
                         <a href="/stockDash">
                            <MDBBtn className='btn-med' style={{ fontSize:'16px', fontWeight:'100',letterSpacing:'2px' }} color='dark'>
                                Back
                            </MDBBtn>
                        </a>
                     </div>
                     <MDBRow>
                        <MDBCol sm='5'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody >
                            <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Name</label>
                                            <input type="text" class="form-control" style={{fontSize:"17px"}} value={name} placeholder="Enter Vehicle Model"   onChange={(e) =>{
                                                setName(e.target.value);
                                            }}/>
                                            
                                        </div>
                               
                                       <div class="mb-3 mt-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Enter Expiry Date</label>
                                            <input type="date" class="form-control" style={{fontSize:"17px"}} value={date}  onChange={(e) =>{
                                                setDate(e.target.value);
                                            }}/>
                                        </div>

                                        <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Select Brand</label>
                                            <select class="form-select" style={{fontSize:"17px"}} value={brand} onChange={(e) =>{
                                                setBrand(e.target.value);
                                            }}>
                                                    <option selected>Select Vehicle Type</option>
                                                    <option value="Car">Car</option>
                                                    <option value="Van">Van</option>
                                                    <option value="Bike">Bike</option>
                                                    <option value="Sport Car">Sport Car</option>
                                                    <option value="SUV">SUV</option>
                                                    <option value="Heavy Vehicle">Heavy Vehicle</option>
                                            </select>
                                        </div>

                                     

                                        

                                        
                                         
                            </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol sm='1'></MDBCol>
                        <MDBCol sm='6'>
                            <MDBCard className='shadow-0'>
                            <MDBCardBody>
                             
                                      
                                      
                            <div class="mb-3">
                                            <label  class="form-label h5">Price</label>
                                            <input type="Number" class="form-control"  value={price}   onChange={(e) =>{
                                                setPrice(e.target.value);
                                            }}/>
                                            
                                        </div>
                                        <div class="mb-3">
                                            <label  class="form-label h5">quantity</label>
                                            <input type="text" class="form-control"  value={quantity}   onChange={(e) =>{
                                                setQuantity(e.target.value);
                                            }}/>
                                            
                                        </div>

                                        <div class="mb-3">
                                            <label  class="form-label h5" style={{fontWeight:"bold",fontSize:"20px"}}>Description</label>
                                            <input type="text" class="form-control" style={{fontSize:"17px"}} value={description}     onChange={(e) =>{
                                                setDescription(e.target.value);
                                            }}/>
                                            
                                        </div>
                                     
                                   
                                 
                                         
                                        <div className="text-end">
                                               <br/>
                                                <button type="button" class="btn btn-success d-letter-spacing " style={{fontSize:"15px"}} onClick={vehicleUpdate} >Update Medicine</button>&nbsp;&nbsp;&nbsp;
                                                <button type="button" class="btn btn-primary d-letter-spacing " style={{fontSize:"15px"}} onClick={generatePDF} > Download  Details</button>
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


export default MedicineEdit;