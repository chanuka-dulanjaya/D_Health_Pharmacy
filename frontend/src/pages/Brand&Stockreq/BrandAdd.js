import React, { useState, useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { reactLocalStorage } from 'reactjs-localstorage';
import NumberFormat from 'react-number-format';
import Layout from '../../components/Layout';

function BrandAdd() {

    const [Brand, setBrand] = useState("");
    const [url, setUrl] = useState("");
    const [telephone, setTelephoneOne] = useState("");
 
    const [email, setEmail] = useState("");
    const [imageSelected, setimageSelected] = useState("");

    
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

    const [brands,setBrands] = useState([]);
    

          useEffect(() => {
              axios.get("http://localhost:5000/brands/allBrands")
              .then(res => setBrands(res.data))
              .catch(error => console.log(error));
              },[]);
     
      

    function Save(e){
          e.preventDefault();
           const formData = new FormData();
           formData.append("file" ,imageSelected);
           formData.append("upload_preset", "ml_default");
  
           axios.post("https://api.cloudinary.com/v1_1/dnomnqmne/image/upload",formData).then((response)=>{
              console.log(imageSelected)
              const picture =imageSelected.name;

          const addBrand ={ Brand , url , telephone , email , picture }

          axios.post("http://localhost:5000/brands/addBrand",addBrand).then(() =>{

          Swal.fire({  
          title: "Success!",
          text: "Brand Added!",
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
          text: "Brand Not Added!",
          icon: 'error',
          confirmButtonText: "OK",
          type: "success"})
      })
      })
    }




 

  
  function remove(id)
  { 
      axios.delete("http://localhost:5000/brands/deleteBrand/"+id).then(() =>{
          Swal.fire({  
              title: "Success!",
              text: "Brand Deleted",
              icon: 'success',
              confirmButtonText: "OK",
              type: "success"})

      }).catch((err)=>{
          Swal.fire({  
              title: "Error!",
              text: "Brand Not Delete",
              icon: 'error',
              confirmButtonText: "OK",
              type: "success"})
      })
  }

  function edit(_id, Brand, url, telephone, email, image)
  {
      reactLocalStorage.setObject("service_center", [_id, Brand, url, telephone, email, image]);
      window.location.href = "/brandEdit";
  }



  const searchHandle = async(e) =>{
    const key =e.target.value;
    if(key){
        let result = await fetch(`http://localhost:5000/brands/search/${key}`);
        result = await result.json()
       
        if(result){
            setBrands(result)
        }
    }else{
       let result = await fetch(`http://localhost:5000/brands/allBrands`)
        result = await result.json()
        if(result){
            setBrands(result)
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
               <div className="container-fluid bg-white" style={{paddingLeft:'5%', paddingTop:'2%' ,paddingBottom:'2%', paddingRight:'5%'}} >
                   <center>
                       <h3 className="text-uppercase">Brand Management</h3>
                   </center>
                    <MDBRow className='mt-3'>
                      <MDBCol sm='5'>
                          <MDBCard className='shadow-0'>
                          <MDBCardBody id="divToPrint">
                              
                              <div class="mb-3 mt-4">
                                  <h6>Search Brand</h6>
                                  <MDBInput  className="mt-3 bg-white" id='form1' type='text' placeholder="Search Locations"  onChange={searchHandle}/>
                              </div>
                             <MDBTable borderless className='mt-3' >
                              <MDBTableHead>
                                  <tr className="bg-dark">
                                       <th scope='col' className="text-white d-letter-spacing h6">Brand Name</th>
                                       <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
                                  </tr>
                              </MDBTableHead>
                              <MDBTableBody>
                                     {brands.map((brand,key) => (
                                          <tr className="bg-light">
                                              <td>
                                                  <h6>
                                                      {brand.Brand}
                                                  </h6>
                                              </td>
                                              <td className="text-center">
                                                  <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(brand._id)}><MDBIcon fas icon="trash-alt" /></MDBBtn>{''}&nbsp;&nbsp;
                                                  <MDBBtn size='sm' className="shadow-0" color='success' onClick={() => edit( brand._id, brand.Brand, brand.url, brand.telephone,  brand.email, brand.image)}><MDBIcon fas icon="edit" /></MDBBtn>{''}&nbsp;&nbsp;
                                              </td>
                                          </tr>
                                     ))}
                              </MDBTableBody>
                              </MDBTable>
                          </MDBCardBody>
                          </MDBCard>
                      </MDBCol>
                      <MDBCol sm='1'></MDBCol>
                      <MDBCol sm='6'>
                          <MDBCard className='shadow-0'>
                          <MDBCardBody  className="bg-light">
                              <center>
                                  <h4>Add New Brand</h4>
                              </center>
                              <div class="mb-3">
                                  <label for="exampleFormControlInput1" class="form-label h6">Brand Name</label>
                                  <input type="text" class="form-control" placeholder="Enter Brand Name" onChange={(e) =>{
                                          setBrand(e.target.value);
                                      }} />
                              </div>
                              <div class="mb-3">
                                  <label for="exampleFormControlInput1" class="form-label h6">Brand url</label>
                                  <input type="text" class="form-control" placeholder="Enter Address" onChange={(e) =>{
                                          setUrl(e.target.value);
                                      }} />
                              </div>
                              <div class="mb-3">
                                  <label for="exampleFormControlInput1" class="form-label h6">Telephone Number</label>
                                  <NumberFormat format="0## ### ####" class="form-control"  placeholder="0## ### ## ##" onChange={(e) =>{
                                              setTelephoneOne(e.target.value);
                                  }}/>
                                 
                              </div>
                             
                              <div class="mb-3">
                                  <label for="exampleFormControlInput1" class="form-label h6">Email</label>
                                  <input type="email" class="form-control" placeholder="Enter Email Address" onChange={(e) =>{
                                          set_Email(e.target.value);
                                  }} />
                                  <span style={{fontSize:'12px', margin:'0px', padding:'0px'}}   >
                                      {emailStatus}
                                  </span>
                              </div>
                              <div className="mb-3">
                                   <label for="exampleFormControlInput1" class="form-label h6">Brand Image</label>
                                  <input type="file" onChange={(e) =>{
                                  setimageSelected(e.target.files[0]);
                                  }} class="form-control" id="customFile" />
                              </div>
                               <div className="text-end">
                                   <button type="button" class="btn btn-success d-letter-spacing " onClick={Save} >Save</button>&nbsp;&nbsp;&nbsp;
                                   <a href="/brandandstockDas">
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


export default BrandAdd;