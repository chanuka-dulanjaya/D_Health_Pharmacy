import React, { useState, useEffect } from 'react';
import {  MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';

import NumberFormat from 'react-number-format';
import Layout from '../../components/Layout';


function StockReqAdd() {
    const [name, setName] = useState("");

    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState("");
    const [date, setDate] = useState("");
   
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");

    const [MedicinesReqs,setallMedicineReq] = useState([]);
   
    // useEffect(() => {
    //     axios.get(global.APIUrl + "/vehicle_category/allVehicleCategory")
    //         .then(res => setAllCategory(res.data))
    //         .catch(error => console.log(error));
    // });

    useEffect(() => {
        axios.get("http://localhost:5000/brands/allBrands")
        .then(res => setBrands(res.data))
        .catch(error => console.log(error));
        },[]);



        useEffect(() => {
            axios.get("http://localhost:5000/medicine_add/allMedicineRequest")
            .then(res => setallMedicineReq(res.data))
            .catch(error => console.log(error));
          },[]);

//medicine request add fuction
    function addVehicle(e) {
        e.preventDefault();

        const addMedicineReq = { name, brand, description,quantity ,date}

        axios.post("http://localhost:5000/medicine_add/addMedicineRequest", addMedicineReq).then(() => {

            Swal.fire({
                title: "Success!",
                text: "Medicine Request Added Successfully!",
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
                text: "Please fill all the field!",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })

    }


//vehicle request remove function
    function remove(id) {
        axios.delete("http://localhost:5000/medicine_add/deleteReq/" + id).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Medicine Stock request  Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success",
                
                
            }).then(okay => {
                if (okay) {
                    window.location.reload();
                }
            });

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Can  Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })
       
    }

    function Update(_id, name, brand, description,quantity ,date) {
        reactLocalStorage.setObject("VehicleEdit", [_id, name, brand, description,quantity ,date]);
        window.location.href = "/stockReqEdit";
    }



    return (
        <Layout>
        <div class="dashboard-main-wrapper" >
         
            <div class="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Admin Dashboard</h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }} >
                        <center>
                            <h1 className="text-uppercase">Request Vehicles </h1>
                        </center>

                        <div className="text-end mt-5">

                            <MDBBtn className='btn-sm' style={{ fontSize: '14px', fontWeight: 'light', letterSpacing: '2px' }} outline color='dark' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Send Stock Request
                            </MDBBtn>{' '}
                            <a href="/brandandstockDas">
                                <MDBBtn className='btn-sm' style={{ fontSize: '14px', fontWeight: 'light', letterSpacing: '2px' }} color='dark'>
                                    Back
                                </MDBBtn>
                            </a>&nbsp;&nbsp;&nbsp;
                           
                        <div class="alert alert-dark mt-3 mb-3 text-left" role="alert">
                            <h5 className="text-uppercase" style={{letterSpacing:'2px',textAlign: "left"}}>Medicine Stock Requests history : {MedicinesReqs.length}</h5>
                        </div>

                            <div class="row">
                                {MedicinesReqs.map((Medicine, key) => (
                                    <div class="col-sm-4" >
                                        <div class="card" style={{textAlign: "left"}}>
                                            <div class="card-body text-left">
                                                <br/>
                                                <h5 class="card-title text-dark h3">We Want {Medicine.brand}</h5>
                                                <hr/>
                                                <div className="ms-2 mb-4">
                                                    <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Medcine Name : {Medicine.name}</h6>
                                                    <h6 class="card-text text-muted" style={{fontSize:"17px"}}>Medcine quantity : {Medicine.quantity}</h6>
                                                    <h6 class="card-text text-muted" style={{fontSize:"17px"}}> Date : {Medicine.date}</h6>
                                                   
                                                    <hr />
                                                    <h6 class="card-text text-success" style={{fontSize:"16px"}}>Status : {Medicine.status}</h6>
                                                </div>
                                                <div className="text-end">
                                                    <button type="button" class="btn btn-outline-dark d-letter-spacing " style={{fontSize:"13px"}} onClick={() => Update(Medicine._id,  Medicine.name, Medicine.brand, Medicine.description,Medicine.quantity ,Medicine.date)}  >Update</button>&nbsp;&nbsp;&nbsp;
                                                    <button type="button" class="btn btn-danger d-letter-spacing " style={{fontSize:"13px"}} onClick={() => remove(Medicine._id)} >Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div class="modal fade bg-light" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered  modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header bg-dark">
                                            <h3 class="modal-title text-white d-letter-spacing" id="staticBackdropLabel">Add New Stock Request</h3>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                        </div>
                                        <div class="modal-body  p-4">
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <div class="card shadow-0">
                                                        <div class="card-body text-start">

                                                            

                                                            <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Medicine Name</label>
                                                                <input type="text" class="form-control" placeholder="Enter Model Name" style={{fontSize:"17px"}} onChange={(e) => {
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

                                                          

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="card shadow-0">
                                                        <div class="card-body text-start">
                                                         
                                                        <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Quantity</label>
                                                                <input type="text" class="form-control" placeholder="Enter Model Name" style={{fontSize:"17px"}} onChange={(e) => {
                                                                    setQuantity(e.target.value);
                                                                }} />
                                                            </div>
                                                         

                                                        <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>Date</label>
                                                                <input type="date" class="form-control" style={{fontSize:"17px"}} onChange={(e) => {
                                                                    setDate(e.target.value);
                                                                }} />
                                                            </div>

                                                            <div class="mb-3">
                                                                <label class="form-label h5" style={{fontSize:"20px"}}>description</label>
                                                                <input type="text" class="form-control" placeholder="Enter Model Name" style={{fontSize:"17px"}} onChange={(e) => {
                                                                    setDescription(e.target.value);
                                                                }} />
                                                            </div>

                                                           

                                                         
                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer border-0">
                                            <button type="button" class="btn btn-outline-dark" style={{fontSize:"15px"}} data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-dark" style={{fontSize:"15px"}} onClick={addVehicle}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    )
};


export default StockReqAdd;