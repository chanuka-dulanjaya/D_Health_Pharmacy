import React, { useState , useEffect } from 'react';
import { MDBIcon,MDBBtn, MDBCol, MDBCard, MDBCardImage, MDBRow , MDBCardBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Layout from '../../components/Layout';


function UserProfile() {
    const [password, setPassword] = useState("");
    const [UserName, setUsername] = useState("");
    const [disabled, setdisabled] = useState(true);
    const userName =  sessionStorage.getItem('user_name');
    const [profileData,setUserProfile] = useState([]);
    useEffect(() => {
          axios.get(global.APIUrl+"/user/viewUserProfie/"+userName)
          .then(res => setUserProfile(res.data))
          .catch(error => console.log(error));
    });

    function UserProfileEdit( name, email, telephone1, Category, otherCategory, Brand, otherBrand, Dream, Salary, address, userName)
    {
         reactLocalStorage.setObject("userProfileForUpdate", [ name, email, telephone1, Category, otherCategory, Brand, otherBrand, Dream, Salary, address, userName]);
         window.location.href = "/userProfileEdit";
    }

    return (
        <Layout>
    <div>
      
     
                <MDBRow  style={{marginTop:'7%', marginBottom:'10%', width:'99%'}}>
                <MDBCol sm='1'></MDBCol>
                 <MDBCol sm='5'>
                    <MDBCard className="border-0 shadow-0">
                        <MDBCardImage style={{width:'50%', marginTop:'5%'}}  position='top' alt='...' src='https://freepngimg.com/thumb/man/28-man-png-image.png' />
                    </MDBCard>
                </MDBCol>
                <MDBCol sm='6'>
                    <MDBCard className="border-0 shadow-0 p-5">
                         {profileData.map((data,key) => (
                            <MDBCardBody className="pt-5 mt-3 text-left">
                            <div className="bg-light p-4">
                                <center><h2 className="text-uppercase">User Profile</h2></center>
                                
                                <table width='95%' className="mt-4 p-5">
                                    <tr>
                                        <td>
                                            <h5>Full Name : </h5>
                                        </td>
                                        <td>
                                            <p style={{fontWeight:'600'}} className="text-capitalize">{data.name}</p>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>
                                            <h5>Email : </h5>
                                        </td>
                                        <td>
                                            <p style={{fontWeight:'600'}} className="text-capitalize">{data.email}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h5>Telephone : </h5>
                                        </td>
                                        <td>
                                            <p style={{fontWeight:'600'}} className="text-capitalize">{data.telephone1}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h5>Favorite Vehicle Category : </h5>
                                        </td>
                                        <td>
                                            <p style={{fontWeight:'600'}} className="text-capitalize">{data.Category}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h5>Other Vehicle Category : </h5>
                                        </td>
                                        <td>
                                            <p style={{fontWeight:'600'}} className="text-capitalize">{data.otherCategory}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h5>Favorite Vehicle Brand : </h5>
                                        </td>
                                        <td>
                                            <p style={{fontWeight:'600'}} className="text-capitalize">{data.Brand}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h5>Other Vehicle Brand : </h5>
                                        </td>
                                        <td>
                                            <p style={{fontWeight:'600'}} className="text-capitalize">{data.otherCategory}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h5>Average Salary : </h5>
                                        </td>
                                        <td>
                                            <p style={{fontWeight:'600'}} className="text-capitalize">RS.{data.Salary}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h5>Dream Vehicle : </h5>
                                        </td>
                                        <td>
                                            <p style={{fontWeight:'600'}} className="text-capitalize">{data.Dream}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h5>Address : </h5>
                                        </td>
                                        <td>
                                            <p style={{fontWeight:'600'}} className="text-capitalize">{data.address}</p>
                                        </td>
                                    </tr>
                                    </table>
                                
                                    <div className="text-end mt-4">
                                        <a href="userAdminDashboard">
                                        <button type="button" class="btn btn-dark btn-sm d-letter-spacing shadow-0" >Back</button>
                                        </a>&nbsp;&nbsp;&nbsp;
                                        <button type="button" class="btn btn-success btn-sm d-letter-spacing shadow-0" onClick={()=>UserProfileEdit(
                                            data.name,
                                            data.email,
                                            data.telephone1,
                                            data.Category,
                                            data.otherCategory,
                                            data.Brand,
                                            data.otherBrand,
                                            data.Dream,
                                            data.Salary,
                                            data.address,
                                            data.userName
                                        )}>Edit</button>
                                    </div>
                            </div>
                            </MDBCardBody>
                      ))}
                    </MDBCard>
                </MDBCol>
                </MDBRow>
        
    </div>
    </Layout>
    )
};

export default UserProfile;