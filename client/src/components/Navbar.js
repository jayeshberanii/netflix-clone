import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import styled from 'styled-components'
import {FaPowerOff, FaSearch} from 'react-icons/fa'
import { signOut } from 'firebase/auth'
import { firebaseAuth } from '../utils/firebase-config'

function Navbar({isScrolled}) {

const[showSearch,setShowSearch]=useState(false)
const[inputHover,setInputHover]=useState(true)
const navigate=useNavigate()

    const links=[
        {name:'Home',link:'/'},
        {name:'TV Shows',link:'/tv'},
        {name:'Movies',link:'/movies'},
        {name:'My List',link:'/my-list'},
    ]
  return (
   <Container>
    <nav className={`d-flex ${isScrolled ? "scrolled" : ""}  justify-content-between align-items-center`}>
        <div className='left d-flex align-items-center'>
            <div className='brand d-flex align-items-center justify-content-center'>
                <img src={logo} alt="logo" />
            </div>
            <ul className="links d-flex">
                {
                    links.map((link)=>{
                        return(
                            <li key={link.name}>
                                <Link to={link.link}>{link.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        <div className='right d-flex align-items-center'>
            <div className={`d-flex align-items-center justify-content-center search ${showSearch ? "show-search" : ""} `}>
                <button onFocus={()=>setShowSearch(true )} onBlur={()=>{
                    !inputHover && setShowSearch(false)
                }}>
                    <FaSearch/>
                </button>
                <input
                    type="text" 
                    placeholder="Search" 
                    onMouseEnter={()=>{
                        setInputHover(true)
                    }}
                    onMouseLeave={()=>{
                        setInputHover(false)
                    }}
                    onBlur={()=>{
                        setShowSearch(false)
                        setInputHover(false)
                    }}
                />
            </div>
            <button onClick={()=>{
                alert("hello")
                signOut(firebaseAuth)
                navigate('/login')
            }}>
                <FaPowerOff />
            </button>
        </div>
    </nav>
   </Container>
  )
}
const Container=styled.div`
    .scrolled{
        background-color:rgba(0,0,0,0.8);        
    }
    nav{
        padding:0 4rem;
        position:sticky; 
        top:0;
        height:6.5rem;
        width:100%;
        position:fixed;
        z-index:2;
        position:fixed;
        transition: 0.3s ease-in-out;
        .left{
            width:100%
            gap:2rem;
            .brand{
                img{
                    height:4rem;
                }
            }
            .links{
                list-style-type:none;
                gap:2rem;
                li{
                    a{
                        color:white;
                        text-decoration:none;
                    }
                }
            }
        }
        .right{
            padding-right:12rem; 
            gap:1rem;
            button{
                background-color:transparent;
                border:none;
                cursor:pointer;
                &:focus{
                    outline:none;
                }
                svg{
                    color:#f34242;
                    font-size:1.2rem;
                }
            }
            .search{                   
                gap:0.4rem;
                padding:0.2rem;
                button{
                    background-color:transparent;
                    svg{
                        color:white;                        
                    }
                }
                input{
                    width:0;
                    opacity:0;
                    visibility:hidden;
                    transition: 0.3s ease-in-out;
                    background-color:transparent;
                    border:none;
                    color:white;
                    &:focus{
                        outline:none;
                    }
                }
            }
            .show-search{
                border:1px solid white;
                background-color:rgba(0,0,0,0.6);
                input{
                    width:100%;
                    opacity:1;
                    visibility:visible;
                    padding:0.3rem;
                }
            }
            button{
                background-color:transparent;
                border:none;
                cursor:pointer;
                &:focus{
                    outline:none;
                }
                svg{
                    color:#f34242;
                    font-size:1.2rem;
                }
            }
        }
    }
`;

export default Navbar