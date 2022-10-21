
import React, { useState , useEffect } from 'react';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBCardTitle,MDBCardText,MDBInput, MDBBtn, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Layout from '../../components/Layout';

function StockDashboard() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");

    const [Medicines,setallMedicine] = useState([]);
    useEffect(() => {
          axios.get("http://localhost:5000/medicine_add/allMedicines")
          .then(res => setallMedicine(res.data))
          .catch(error => console.log(error));
        },[]);

  

  

    function remove(id)
    { 
        axios.delete("http://localhost:5000/medicine_add/deleteMedicine/"+id).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Medicine  Delete",
                icon: 'success',
                confirmButtonText: "OK",
                confirmButtonColor: '#8a0a0a',
                type: "success"}).then(okay => {
                    if (okay) {
                        window.location.reload();
                    }
                });

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Medicine  Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                confirmButtonColor: '#8a0a0a',
                type: "success"})
        })
    }

    function update(_id,name, date, brand, price, description, quantity){
         reactLocalStorage.setObject("importVehicleEdit", [_id,name, date, brand, price, description, quantity]);
         window.location.href = "/editMed";
    }

    // function generatePdf()
    // {
    //     var doc = new jsPDF('p', 'pt');
    //     doc.setTextColor(254, 8, 8 );
    //     doc.text(10, 20, "Import Vehicle List ")
    //     doc.setFontSize(10);
    //     doc.setTextColor(3, 3, 3);
       
    //     doc.text(45, 60, 'Vans : '+Vans.length)
    //     doc.text(45, 80, 'Bikes : '+Bikes.length)
    //     doc.text(45, 100, 'Heavy Vehicles : '+HeavyVehicles.length)
    //     doc.addFont('helvetica', 'normal')
    //     doc.setFontSize(12);
    //     doc.setTextColor(3, 3, 3);
    //     doc.save('Import Vehicle List.pdf')
    // }
    

    
     const [ImportVehicles,setAllImportVehicle] = useState([]);
     const [searchName,setsearchName] = useState("")





     const searchHandle = async(e) =>{
        const key =e.target.value;

        if(key){
            let result = await fetch(`http://localhost:5000/medicine_add/search/${key}`);
            result = await result.json()
           
            if(result){
                setallMedicine(result)
            }
        }else{
           let result = await fetch(`http://localhost:5000/medicine_add/allMedicines`)
            result = await result.json()
            if(result){
                setallMedicine(result)
            }
        }
       
    }





    return (
        <Layout>
    <div class="dashboard-main-wrapper" >
     
        <div class="dashboard-wrapper">
            <div  style={{paddingTop:'3%',paddingLeft:'2%', width:'98%'}}>
                <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{color:'black'}}><i class="fas fa-home"></i>Admin Dashboard</h4>
                <hr/>
                 
                <div class="alert alert-dark mt-3 mb-3 text-left" role="alert">
                            <h5 className="text-uppercase" style={{letterSpacing:'2px',textAlign: "left"}}>ALL Medicnie Total: {Medicines.length}</h5>
                        </div>

                  <center style={{marginTop:'6%'}}>
                    <h1 className="text-uppercase text-black">All Medicine Management </h1>
                    <br/>
                  </center>
                
                  
              
                     
                        
                
                 <div className="text-end">
                     <a href="/stockReqManage">
                      <MDBBtn className='btn-sm' style={{ fontSize:'16px', fontWeight:'light'}} outline color='dark' >
                           Medicine Stock Requests
                        </MDBBtn>{' '}
                     </a>

                    <a href="/addMed">
                        <MDBBtn className='btn-sm' style={{ fontSize:'16px', fontWeight:'light'}} outline color='dark' >
                            Add New Medicine
                        </MDBBtn>{' '}
                    </a>
                    
                    {/* <MDBBtn className='btn-sm' onClick={generatePdf} style={{ fontSize:'16px', fontWeight:'light'}} outline color='danger' >
                            Download
                        </MDBBtn>{' '} */}
                 </div>

                 
                   
                  <div class="row mt-3">
                  <div className=" pt-1 mt-5">
                        <h3>Search Medicine Here...</h3>
                        <MDBInput  className="mt-3 bg-white" id='form1' type='text'  onChange={searchHandle}/>
                        <br/><br/>
                </div>
                        {Medicines.map((Medicine,key) => (
                        <div class="col-sm-3">
                            <div class="card">
                             <img src={"https://res.cloudinary.com/dnomnqmne/image/upload/v1630743483/"+Medicine.image} class="card-img-top" alt="..."/>
                            <div class="card-body text-left">
                                <h5 class="card-title  h4">{Medicine.name} - {Medicine.brand}</h5>
                                <div className="ms-2 mb-4">
                                  <h6 class="card-text text-danger">Price : RS.{Medicine.price}</h6>
                                  <h6 class="card-text text-danger">Quantity : {Medicine.quantity}</h6>
                                  <h6 class="card-text text-danger">Name : {Medicine.date}</h6>
                                </div>
                                <div className="text-end">
                                      <button type="button" class="btn btn-outline-dark d-letter-spacing " style={{fontSize:"14px"}} onClick={() => update(Medicine._id
                                        , Medicine.name
                                        , Medicine.brand
                                        , Medicine.date
                                        , Medicine.price
                                        , Medicine.description
                                        , Medicine.quantity
                                        )}   >Update</button>&nbsp;&nbsp;&nbsp;
                                      <button type="button" class="btn btn-danger d-letter-spacing " style={{fontSize:"14px"}} onClick={() => remove(Medicine._id)} >Delete</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        ))}
                        </div>
            </div>
        </div>
      </div>
      </Layout>
      )
};


export default StockDashboard;