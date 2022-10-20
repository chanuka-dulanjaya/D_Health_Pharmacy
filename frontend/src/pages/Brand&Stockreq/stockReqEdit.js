import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';

import jsPDF from 'jspdf';
import Layout from '../../components/Layout';

function StockReqEdit() {
    var VehicleEdit = reactLocalStorage.getObject('VehicleEdit');
    const id = VehicleEdit[0];

    const [name, setName] = useState(VehicleEdit[1]);

    
    const [brand, setBrand] = useState(VehicleEdit[2]);
    const [description, setDescription] = useState(VehicleEdit[3]);
    const [quantity, setQuantity] = useState(VehicleEdit[4]);
    const [date, setDate] = useState(VehicleEdit[5]);
   
    
    
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/brands/allBrands")
        .then(res => setBrands(res.data))
        .catch(error => console.log(error));
        },[]);


//request update function
    function vehicleUpdate(e) {
        e.preventDefault();
        const editVehicle = { name, brand, description,quantity ,date }

        axios.put("http://localhost:5000/medicine_add/medicineReqUpdate/" + id, editVehicle).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Request Updated",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/stockReqAdd";
                }
            });

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Request Not Updated",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
    }

//pdf generate function
    // function generatePDF(){
    //     var doc = new jsPDF();
        
       
        
    //     doc.setTextColor(254, 8, 8 );
    //     doc.setFontSize(30);
    //     doc.setFont('bold')
        
    //     doc.text(50,40,'Vehicle Request Details')
        
    //     doc.addFont('helvetica', 'normal')
    //     doc.setFontSize(20);
    //     doc.setTextColor(3, 3, 3);
       
    //     doc.text(25, 70, 'Vehicle Type : '+vehicleType)
    //     doc.text(25, 90, 'Brand : '+brand)      
    //     doc.text(25, 110, 'Color : '+color)      
    //     doc.text(25, 130, 'Condition  : '+condition)      
    //     doc.text(25, 150, 'Model  : '+model)      
    //     doc.text(25, 170, 'Action Date : '+auctionDate)      
    //     doc.save('We Want '+ vehicleType+'.pdf')
    // }  



    return (
        <Layout>
        <div class="dashboard-main-wrapper" >
          
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Admin Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <center>
                            <h1 className="text-uppercase">Vehicle Request Update </h1>
                        </center>
                        <div className="text-end mt-5">
                            <a href="/stockReqAdd">
                                <MDBBtn className='btn-sm' style={{ fontSize: '15px', fontWeight: '100', letterSpacing: '2px' }} color='dark'>
                                    Back
                                </MDBBtn>
                            </a>
                        </div>
                        <MDBRow>
                            <MDBCol sm='5'>
                                <MDBCard className='shadow-0'>
                                    <MDBCardBody >
                                       
                                    <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Medicine Name</label>
                                                                <input type="text" class="form-control" placeholder="Enter Model Name" style={{fontSize:"17px"}} value={name} onChange={(e) => {
                                                                    setName(e.target.value);
                                                                }} />
                                                            </div>

                                                            <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Medicine Brand</label>
                                                                <select class="form-select" aria-label="Default select example" style={{fontSize:"17px"}} onChange={(e) => {
                                                                    setBrand(e.target.value);
                                                                }}>
                                                                    <option selected>Select Brand</option>
                                                                    {brands.map((brand, key) => (
                                                                        <option value={brand.Brand}>{brand.Brand}</option>
                                                                    ))}
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
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Quantity</label>
                                                                <input type="text" class="form-control" placeholder="Enter Model Name" style={{fontSize:"17px"}} value={quantity} onChange={(e) => {
                                                                    setQuantity(e.target.value);
                                                                }} />
                                                            </div>
                                                         

                                                        <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Date</label>
                                                                <input type="date" class="form-control" style={{fontSize:"17px"}} value={date} onChange={(e) => {
                                                                    setDate(e.target.value);
                                                                }} />
                                                            </div>

                                                            <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>description</label>
                                                                <input type="text" class="form-control" placeholder="Enter Model Name" style={{fontSize:"17px"}} value={description} onChange={(e) => {
                                                                    setDescription(e.target.value);
                                                                }} />
                                                            </div>
                                        <div className="text-end">
                                            <button type="button" class="btn btn-success d-letter-spacing " style={{fontSize:"14px"}} onClick={vehicleUpdate} >Update</button>&nbsp;&nbsp;&nbsp;
                                            {/* <button type="button" class="btn btn-primary d-letter-spacing " style={{fontSize:"14px"}} onClick={generatePDF} >Print</button> */}
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


export default StockReqEdit;