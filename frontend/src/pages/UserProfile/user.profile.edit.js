import React, { useState , useEffect } from 'react';
import { MDBIcon,MDBBtn, MDBCol, MDBCard, MDBCardImage, MDBRow , MDBCardBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';

import NumberFormat from 'react-number-format';
import passwordValidator from 'password-validator';
import Layout from '../../components/Layout';

var schema = new passwordValidator();

function UserProfEdit() {
    const [showBasic, setShowBasic] = useState(false);
    const [showNavRight, setShowNavRight] = useState(false);
     
    var userProfileForUpdate = reactLocalStorage.getObject('userProfileForUpdate');

   const [email, setEmail] = useState(userProfileForUpdate[1]);
   const [name, setFULLName] = useState(userProfileForUpdate[0]);
   const [address, setAddress] = useState(userProfileForUpdate[9]);
   const [otherCategory, setOtherCategories] = useState(userProfileForUpdate[4]);
   const [otherBrand, setOtherBrands] = useState(userProfileForUpdate[6]);
   const [telephone1, setPhone] = useState(userProfileForUpdate[2]);
   const [Category, setCategory] = useState(userProfileForUpdate[3]);
   const [Brand, setBrand] = useState(userProfileForUpdate[5]);
   const [Salary, setSalary] = useState(userProfileForUpdate[8]);
   const [Dream, setdreamVehicle] = useState(userProfileForUpdate[7]);
   const userName =  sessionStorage.getItem('user_name');
   const [AllCategories,setAllCategory] = useState([])
   useEffect(() => {
            axios.get(global.APIUrl+"/vehicle_category/allVehicleCategory")
            .then(res => setAllCategory(res.data))
            .catch(error => console.log(error));
         });



   function Update(e){
       e.preventDefault();
       const updateProfile ={  name, email, telephone1, Category, otherCategory, Brand, otherBrand, Salary, Dream, address}

        axios.put(global.APIUrl+"/user/updateUserProfile/"+userName,updateProfile).then(() =>{

        Swal.fire({  
          title: "Success!",
          text: "User Profile Updating Success!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"}).then(okay => {
          if (okay) {
              window.location.href = "/UserProfile";
          }
        });

        
    }).catch((err)=>{

        Swal.fire({  
        title: "Error!",
        text: "Registrtaion Not Success",
        icon: 'error',
        confirmButtonText: "OK",
        type: "success"})
    })
  } 

  

    

    return (
      <Layout>
    <div>
        
     
          <MDBRow  style={{marginTop:'1%', marginBottom:'10%', width:'99%'}}>
                <MDBCol sm='1'></MDBCol>
                 <MDBCol sm='5'>
                    <MDBCard className="border-0 shadow-0">
                        <MDBCardImage style={{width:'66%', marginTop:'45%'}} position='top' alt='...' src='https://freepngimg.com/thumb/man/28-man-png-image.png' />
                    </MDBCard>
                </MDBCol>
                 <MDBCol sm='6'>
                      <MDBCard className="border-0 shadow-0 p-5">
                    <MDBCardBody className="pt-5 mt-3 text-left">
                       <div className="bg-light p-4">
                         <center><h2 className="text-uppercase">User Profile Edit - {}</h2></center>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Full Name</label>
                          <input type="text" class="form-control" 
                          onChange={(e) =>{
                              setFULLName(e.target.value);
                          }}/>
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Phone Number</label>
                          <NumberFormat format="0## ### ####" class="form-control" value={telephone1} placeholder="071 110 1111"  onChange={(e) =>{
                              setPhone(e.target.value);
                          }} />
                        </div>
                         <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Email</label>
                          <input type="email" class="form-control" value={email} onChange={(e) =>{
                              setEmail(e.target.value);
                          }} />
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Address</label>
                          <input type="text" class="form-control" value={address} onChange={(e) =>{
                              setAddress(e.target.value);
                          }} />
                        </div>
                        <hr className="mt-5 mb-4"/>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Your Favorite Vehicle Category</label>
                          <select class="form-select" required  onChange={(e) =>{
                                        setCategory(e.target.value);
                                    }}>
                                        <option selected>Your Favorite Vehicle Category</option>
                                        <option selected className="text-white bg-danger" value={Category}>{Category}</option>
                                        {AllCategories.map((AllCategory,key) => (
                                                        <option value={AllCategory.name}>{AllCategory.name}</option>
                                        ))}
                          </select>
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Other Categories</label>
                          <input type="text" class="form-control" value={otherCategory} onChange={(e) =>{
                              setOtherCategories(e.target.value);
                          }} />
                        </div>
                         <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Your Favorite Vehicle Brand</label>
                          <select class="form-select"  onChange={(e) =>{
                                        setBrand(e.target.value);
                                    }}>
                                        <option selected>Your Favorite Vehicle Brand</option>
                                          <option selected className="text-white bg-danger" value={Brand}>{Brand}</option>
                                        <option value="BMW">BMW</option>
                                        <option value="Benz">Benz</option>
                                        <option value="Jeep">Jeep</option>
                                        <option value="Toyota">Toyota</option>
                                        <option value="Bajaj">Bajaj</option>
                                        <option value="Isuski">Isuski</option>
                                        <option value="Nisan">Nisan</option>
                                        <option value="Masda">Masda</option>
                                       
                          </select>
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Other Brands</label>
                          <input type="text" class="form-control" value={otherBrand} onChange={(e) =>{
                              setOtherBrands(e.target.value);
                          }} />
                        </div>
                         <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Your Average Salary</label>
                          <input type="text" value={Salary} class="form-control" 
                                                  onChange={(e) =>{
                                                      setSalary(e.target.value);
                                                  }}/>
                         </div>
                         <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label">Your Dream Vehicle</label>
                          <input type="text" value={Dream} class="form-control" 
                                                  onChange={(e) =>{
                                                      setdreamVehicle(e.target.value);
                                                  }}/>
                         </div>
                         <div class="mt-3 mb-2">
                            <div class="text-end">
                                    <MDBBtn class="btn text-white bg-dark d-letter-spacing fw-light" onClick={Update}>Update</MDBBtn> &nbsp;&nbsp;&nbsp;
                                    <MDBBtn class="btn btn-outline-dark d-letter-spacing fw-light" >Back</MDBBtn> 
                            </div>
                         </div>
                        
                       </div> 
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow>
         
    </div>
    </Layout>
    )
};

export default UserProfEdit;