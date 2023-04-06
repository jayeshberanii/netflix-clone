import React from 'react'
import logo from '../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import GoogleLogo from '../assets/images/google-logo.png'
import { signInWithPopup } from 'firebase/auth'
import { firebaseAuth, provider } from '../utils/firebase-config'

function Header(props) {
    const navigate=useNavigate()

    const handleLogInWithGoogle = async() => {
        // const googleProvider=new firebaseAuth.GoogleAuthProvider()
        // firebaseAuth.signInWithPopup(googleProvider)
        await signInWithPopup(firebaseAuth,provider)
        // .then(res=>{console.log(res.user)})
        // .catch(err=>console.log(err.message))
      };

  return (
    <Container className='d-flex align-items-center justify-content-between'>
        <div className='logo'>
            <img src={logo} alt="logo" />
        </div>
        <div className='d-flex buttons'>
        <button className="button d-flex align-items-center justify-content-center" onClick={handleLogInWithGoogle} >
            <img src={GoogleLogo} alt="google-logo" />
            Get Started
        </button>
        <button onClick={()=>navigate(props.login ? "/login" : "/signup")}>
            {props.login ? "Log In" : "Sign Up"}
        </button>
        </div>
    </Container>
  )
}
const Container=styled.div`
    padding: 0 4rem;
    .logo{
        img{
            height:5rem;
        }
    }
    .buttons{
        gap:1rem;
        button{
            padding:0.5rem 1rem;
            background-color:#e50914;
            border:none;
            cursor:pointer;
            color:white;
            border-radius:0.2rem;
            font-weight:bolder;
        font-size:1.05rem;
    }
    .button {            
        padding: 0.5rem 1rem;
        background-color:white;
        border: none;
        cursor: pointer;
        color: rgba(95, 94, 94, 1);
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
        img{
            height:20px;
            width:20px;
            margin-right:0.5rem;
        }
    }
}
`

export default Header