import React, { useState , useEffect } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';


import Layout from '../../components/Layout';
import { useSelector } from 'react-redux';

function Feedback() {
    const [showBasic, setShowBasic] = useState(false);
    const [showNavRight, setShowNavRight] = useState(false);
    
    const [Feedback, setFeedback] = useState("");
    const [start, setStars] = useState("");
    const [FeedbackType, setfeedBackType] = useState("");
    const [FeedBackAbout, setfeedBackAbout] = useState("");

    const [Feedbacks,setFeedbacks] = useState([])
    useEffect(() => {
       axios.get("http://localhost:5000/feedback/allFeedback")
       .then(res => setFeedbacks(res.data))
       .catch(error => console.log(error));
    })

    const {user} = useSelector((state)=>state.user)
    const username  = user?.name

    function send(e){
        e.preventDefault();
      
        const newFeedback ={
            username, start, Feedback,FeedbackType,FeedBackAbout
        }

        axios.post("http://localhost:5000/feedback/addFeedback",newFeedback).then(() =>{

            Swal.fire({  
                title: "Success!",
                text: "Feedback Sent",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            
            Swal.fire({  
                title: "Error!",
                text: "Feedback Not Sent",
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
                <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize:'55px', letterSpacing:'2px'}}>Feedback</p>
                </div>
            </div>
        </div>
        <br/>
        <br/>
        <div className="container bg-light mb-5">
           <div className="p-5">
             <div className="mb-3">
                <label  className="form-label h5">Your Feedback</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="6" onChange={(e) =>{
                    setFeedback(e.target.value);
                }}></textarea>
            </div>
             <div className="mb-3">
                <label  className="form-label h5">Give Stars</label>
                <select class="form-select"  onChange={(e) =>{
                    setStars(e.target.value);
                }}>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                </select>
            </div>
            <div class="row g-2">
             <div class="col-md">
                <div className="mb-3">
                    <label  className="form-label h5">Feedback</label>
                    <select class="form-select"  onChange={(e) =>{
                        setfeedBackType(e.target.value);
                    }}>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                    </select>
                </div>
             </div>
             <div class="col-md">
                <div className="mb-3">
                <label  className="form-label h5">Feedback About</label>
                    <select class="form-select"  onChange={(e) =>{
                        setfeedBackAbout(e.target.value);
                    }}>
                        <option value="Showroom">Channel</option>
                        <option value="Payments">Products</option>
                        <option value="Other">Other</option>
                    </select>
                </div>      
             </div>
            </div>
            <div className="text-end">
                <button type="submit" class="btn btn-dark btn-lg mb-3" style={{letterSpacing:'1px'}} onClick={send}>Send <MDBIcon fas icon="paper-plane" /></button> { ' '}&nbsp;
                <a href="/feedbackYour">
                     <button type="button" class="btn btn-outline-dark btn-lg mb-3" style={{letterSpacing:'1px'}}>Your Feedbacks</button> 
                </a>
            </div>
           </div>
        </div>
        <div className="container bg-white mb-3">
           <h2 className="ms-3"><br/><br/>All Customer's Feedbacks</h2>
        </div>
          {Feedbacks.map((Feedback,key) => (
               <div className="container bg-white mb-3">
                    <div class="card shadow-0 border ms-3 me-3">
                        <div class="card-body bg-light">
                            <h4 className="text-black">{Feedback.username}</h4>
                            <div className="ms-3">
                                <span className="text-muted " style={{lineHeight:'0px'}}>
                                    Stars Rate : {Feedback.start} / 5<br/>
                                    Feedback About : {Feedback.FeedBackAbout} <br/>
                                    Feedback Type : {Feedback.FeedbackType} <br/><br/>
                                </span>
                                <p>{Feedback.Feedback}</p>
                            </div>
                        </div>
                    </div>
               </div>
          ))}   
          <br/>
          <br/>
          <br/>
       
    </div>
    </Layout>
    )
};

export default Feedback;