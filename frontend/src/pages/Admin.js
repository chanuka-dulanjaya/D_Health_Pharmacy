import axios from 'axios';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Admin = () => {
  const {user} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const getData= async()=>{
      try {
          const response = await axios.post('http://localhost:5000/api/user/get-user-info-by-id',
          {},{

              headers:{
                  Authorization:'Bearer ' +localStorage.getItem('token')
              }

          }
          )
          console.log(response.data);
      } catch (error) {
          console.log(error);
      }
  }


  useEffect(()=>{
      getData()
  },[])

  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  )
}

export default Admin