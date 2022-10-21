
import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { reactLocalStorage } from 'reactjs-localstorage';
import NumberFormat from 'react-number-format';
import Layout from '../../components/Layout';



function MedicineAdd() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");




    const [imageSelected, setimageSelected] = useState("");

    const [brands, setBrands] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/brands/allBrands")
            .then(res => setBrands(res.data))
            .catch(error => console.log(error));
    }, []);


    function save(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "ml_default");
        axios.post("https://api.cloudinary.com/v1_1/dnomnqmne/image/upload", formData).then((response) => {
            const image = imageSelected.name;

            const medicine_import_data = { name, price, brand, description, quantity, date, image }
            axios.post("http://localhost:5000/medicine_add/addMedicine", medicine_import_data).then(() => {

                Swal.fire({
                    title: "Success!",
                    text: "Medicine Added!",
                    icon: 'success',
                    confirmButtonText: "Success",
                    confirmButtonColor: '#8a0a0a',
                    type: "danger"
                }).then(okay => {
                    if (okay) {
                        window.location.href = "/stockDash";
                    }
                });


            }).catch((err) => {

                Swal.fire({
                    title: "Error!",
                    text: "Medicine Not Added!",
                    icon: 'error',
                    confirmButtonText: "Success",
                    confirmButtonColor: '#8a0a0a',
                    type: "danger"
                })
            })
        })
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
                                <h1 className="text-uppercase"><u>Add New Medicine </u></h1>
                            </center>
                            <div className="text-end mt-5">
                                <a href="/stockDash">
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
                                                <label class="form-label h5" style={{ fontWeight: "bold", fontSize: "20px" }}>Name</label>
                                                <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Vehicle Model" onChange={(e) => {
                                                    setName(e.target.value);
                                                }} />

                                            </div>

                                            <div class="mb-3 mt-3">
                                                <label class="form-label h5" style={{ fontWeight: "bold", fontSize: "20px" }}>Enter Expiry Date</label>
                                                <input type="date" class="form-control" style={{ fontSize: "17px" }} onChange={(e) => {
                                                    setDate(e.target.value);
                                                }} />
                                            </div>



                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontSize: "20px" }}>Medicine Brand</label>
                                                <select class="form-select" aria-label="Default select example" style={{ fontSize: "17px" }} onChange={(e) => {
                                                    setBrand(e.target.value);
                                                }}>
                                                    <option selected>Select Brand</option>
                                                    {brands.map((brand, key) => (
                                                        <option value={brand.Brand}>{brand.Brand}</option>
                                                    ))}
                                                </select>
                                            </div>



                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bold", fontSize: "20px" }}>Quantity</label>

                                                <NumberFormat format="######" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Mileage" onChange={(e) => {
                                                    setQuantity(e.target.value);
                                                }} />
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bold", fontSize: "20px" }}>Description</label>
                                                <input type="text" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Vehicle Model" onChange={(e) => {
                                                    setDescription(e.target.value);
                                                }} />

                                            </div>

                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>
                                <MDBCol sm='1'></MDBCol>
                                <MDBCol sm='6'>
                                    <MDBCard className='shadow-0'>
                                        <MDBCardBody>





                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bold", fontSize: "20px" }}>Price</label>
                                                <input type="number" class="form-control" style={{ fontSize: "17px" }} placeholder="Enter Price of the Vehicle" onChange={(e) => {
                                                    setPrice(e.target.value);
                                                }} />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label h5" style={{ fontWeight: "bold", fontSize: "20px" }}>Enter Image &nbsp;&nbsp;&nbsp;</label>
                                                <input type="file" style={{ fontSize: "17px" }} onChange={(e) => {
                                                    setimageSelected(e.target.files[0]);
                                                }} class="form-control" id="customFile" />
                                            </div>

                                            <div className="text-end">
                                                <br />
                                                <button type="button" class="btn btn-dark" style={{ fontSize: "18px" }} onClick={save}>Save</button>
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


export default MedicineAdd;