import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { firebaseAuth } from '../utils/firebase-config';

function Netflix() {
  const[isScrolled,setIsScrolled]=useState(false)
  const navigate=useNavigate()

  window.onscroll=()=>{
    setIsScrolled(window.pageXOffset===0 ? false :true);
    return ()=> (window.onscroll=null )
  }
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    !currentUser && navigate("/login");
  });
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
    </Container>
  )
}
const Container=styled.div`
  height:100vh;
  width:100vw;
  background-color:black;
`

export default Netflix