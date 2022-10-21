import React, { useState , useEffect } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';



import Layout from '../../components/Layout';

function EditFeedback() {
    const [showBasic, setShowBasic] = useState(false);
    const [showNavRight, setShowNavRight] = useState(false);
    
    var feedback = reactLocalStorage.getObject('feedback');
     
    const id = feedback[0];

    const [Feedback, setFeedback] = useState(feedback[2]);
    const [start, setStars] = useState(feedback[1]);

  

    function Edit(e){
        e.preventDefault();
        const newFeedback ={start, Feedback}

        axios.put("http://localhost:5000/feedback/editFeedback/"+id,newFeedback).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Feedback Updated",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                if (okay) {
                    window.location.href = "/YourFeedback";
                }
            });

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Feedback Not Updated",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }

    return (
        <Layout>
    <div>
       
     
        <div className='bg-image' >
            <img src='https://img.freepik.com/free-vector/customer-online-review-rating-feedback-set_124507-8052.jpg?size=626&ext=jpg' className='img-fluid' alt='Sample' />
            <div className='mask' style={{ backgroundColor: '#292929' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize:'55px', letterSpacing:'2px'}}>Edit Feedback</p>
                </div>
            </div>
        </div>
        <br/>
        <br/>
        <div className="container bg-light mb-5">
           <div className="p-5">
             <div className="mb-3">
                <label  className="form-label h5">Your Feedback</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" value={Feedback} rows="6" onChange={(e) =>{
                    setFeedback(e.target.value);
                }}></textarea>
            </div>
             <div className="mb-3">
                <label  className="form-label h5">Give Stars</label>
                <select class="form-select"  onChange={(e) =>{
                    setStars(e.target.value);
                }}>
                    <option className="text-white bg-danger" value={start}>{start}</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                </select>
            </div>
            <div className="text-end">
                <button type="submit" class="btn btn-dark btn-lg mb-3" style={{letterSpacing:'1px'}} onClick={Edit}>Edit </button> { ' '}&nbsp;
                <a href="YourFeedback">
                     <button type="button" class="btn btn-outline-dark btn-lg mb-3" style={{letterSpacing:'1px'}}>Back</button> 
                </a>
            </div>
           </div>
        </div>
   
    </div>
    </Layout>
    )
};

export default EditFeedback;