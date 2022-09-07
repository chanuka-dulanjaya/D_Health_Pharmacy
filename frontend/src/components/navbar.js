
import React, { useState , useEffect } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse,
  MDBCardImage,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';




function NavBar() {
    const {user} = useSelector((state)=>state.user)
    const token = localStorage.getItem("token")
    const [showBasic, setShowBasic] = useState(false);
    const [showNavRight, setShowNavRight] = useState(false);
    const navigate = useNavigate();
    return (
           <MDBNavbar expand='lg' className="sticky-top" light bgColor='dark'>
            <MDBContainer fluid>
                <MDBNavbarBrand href='/' style={{fontSize:'25px'}} className="pt-2 navbar-brand h1 fw-bold">
                    <MDBIcon fas icon="user-md" className="text-danger" size='2x' /> <span className="text-warning">&nbsp;D</span><span className="text-white">-Health</span>
                </MDBNavbarBrand>

                <MDBNavbarToggler
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setShowBasic(!showBasic)}
                >
                <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showBasic}>
                

               <MDBCollapse navbar show={showNavRight}>
               
                <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                
                    <MDBNavbarItem>
                    <MDBNavbarLink href='/login'>
                    {!token && <MDBBtn size="lg" outline className='mx-2 text-white' style={{fontSize:'12px',letterSpacing:'2px'}} color='danger'>
                            Login
                        </MDBBtn> }
                       
                    </MDBNavbarLink>
                    <MDBNavbarLink href='/login'>
                        {token && <MDBBtn size="lg" outline className='mx-2 text-white' style={{fontSize:'12px',letterSpacing:'2px'}} color='danger' onClick={()=>localStorage.clear()}>
                            Logout
                        </MDBBtn> }
                        
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                    <MDBNavbarLink  href='/register'  >
                        {!token &&  <MDBBtn size="lg" className='mx-2' color='danger'  style={{fontSize:'12px',letterSpacing:'2px'}} >
                            Registration
                        </MDBBtn>}
                       
                    </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                    <MDBNavbarLink href={user?.isAdmin ? "/admin" :"/admin"} tabIndex={-1} aria-disabled='true' style={{color: 'white', cursor: 'pointer',margin:20}}>
                    <span style={{color: 'white'}}>&nbsp;{user?.name}</span>
                    
                    </MDBNavbarLink>
                        </MDBNavbarItem>
                
                </MDBNavbarNav>

                </MDBCollapse>
                </MDBCollapse>
            </MDBContainer>
            </MDBNavbar>
          )
};

export default NavBar;