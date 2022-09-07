import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserAdminDashboard = () => {
    const navigate = useNavigate();
  return (
    <div><h1>userAdminDashboard</h1>
    <button onClick={()=>{localStorage.clear() ; navigate("/login")}}  >Log out</button>
    </div>
  )
}

export default UserAdminDashboard