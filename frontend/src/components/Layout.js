import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../layout.css'
import NavBar from './navbar'

const Layout = ({children}) => {
    const {user} = useSelector((state)=>state.user)
    const location = useLocation()
    const navigate = useNavigate()
    const AdminMenu = [
        {
            name:"Doctors Management ",
            path:'/DocOrderDas',

        },
        {
            name:"Medcine & Product stock Management",
            path:"/stockDash"
        },
        {
            name:"Product Brand & Stock request Management",
            path:"/brandandstockDas"
        },
       
        {
            name:"Medical Centers & Doctors Booking Management",
            path:"/medCenAndBookDas"
        },{
            name:"Feedback Management ",
            path:"/feedbackDash"
        }

    ]

    const userMenu = [
        {
            name:"Channel Centers",
            path:'/allMedicalCent',

        },
        {
            name:"Channel Booking",
            path:"/bookingAdd"
        },
        
        {
            name:"My Orders",
            path:"/orderview"
        }
        ,{
            name:"Feedback Management ",
            path:"/feedbackUser"
        }

    ]


    const menueToBeRender = user?.isAdmin ? AdminMenu :userMenu
    

    return (
        <>
        <NavBar/>
        <div className='main p-2'>

            <div className={`d-flex menu-item`} onClick={()=>{
                localStorage.clear()
                navigate('/login')
            }}>

            </div>
            
            <div className='d-flex layout'>
           
                <div className='sidebar'>
            
                    <div className='menue'>
                        {menueToBeRender.map((menu)=>{
                            const isActive=location.pathname === menu.path
                            return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                        })}
                    </div>
                        
                </div>
                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
        </>
    )
}

export default Layout