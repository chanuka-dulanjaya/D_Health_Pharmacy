import React, { useState , useEffect } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import {reactLocalStorage} from 'reactjs-localstorage';
import Layout from '../../components/Layout';


function YourFeedback() {
    const [showBasic, setShowBasic] = useState(false);
    const [showNavRight, setShowNavRight] = useState(false);
    
    const [Feedback, setFeedback] = useState("");
    const [start, setStars] = useState("");
    const [startAmount, setstartAmount] = useState("");

    const [Feedbacks,setFeedbacks] = useState([])
    useEffect(() => {
       axios.get("http://localhost:5000/feedback/allFeedbackYour/"+sessionStorage.getItem('user_name'))
       .then(res => setFeedbacks(res.data))
       .catch(error => console.log(error));
    })

    function remove(id){
        axios.delete("http://localhost:5000/feedback/deleteFeedback/"+id).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Feedback Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"})

        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Feedback Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
    }

    function update(_id,start,Feedback)
    {
         reactLocalStorage.setObject("feedback", [_id, start, Feedback]);
         window.location.href = "/EditFeedback";
    }
    return (
        <Layout>
    <div>
      
     
        <div className='bg-image' >
            <img src='https://img.freepik.com/free-vector/customer-online-review-rating-feedback-set_124507-8052.jpg?size=626&ext=jpg' className='img-fluid' alt='Sample' />
            <div className='mask' style={{ backgroundColor: '#292929' }}>
                <div className='d-flex justify-content-center align-items-center h-100'>
                <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize:'55px', letterSpacing:'2px'}}>Your Feedback</p>
                
                </div>
            </div>
        </div>
        <br/>
        <br/>
        
        <div className="container bg-white mb-3">
           <h2 className="ms-3"><br/><br/>All Customer's Feedbacks</h2>
            <a href="/feedbackUser">
                <button type="button" class="btn btn-outline-dark btn-small mb-3 ms-3" style={{letterSpacing:'1px'}}>Back</button> 
            </a>
        </div>
          {Feedbacks.map((Feedback,key) => (
               <div className="container bg-white mb-3">
                    <div class="card shadow-0 border ms-3 me-3">
                        <div class="card-body bg-light">
                            <h5 className="text-black">{Feedback.username}</h5>
                            <span className="text-muted" style={{lineHeight:'0px'}}>Stars Rate : {Feedback.start} / Five</span>
                            <p>{Feedback.Feedback}</p>
                            <div className="text-end">
                                    <button type="button" class="btn btn-dark"  onClick={() => update(Feedback._id,Feedback.start,Feedback.Feedback)}>Edit</button>{''}&nbsp;
                                    <button type="button" class="btn btn-danger" onClick={() => remove(Feedback._id)}>Delete</button>
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

export default YourFeedback;