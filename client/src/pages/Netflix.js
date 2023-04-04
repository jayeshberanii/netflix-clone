import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { firebaseAuth } from '../utils/firebase-config';
import backgroundImage from '../assets/images/background-image.webp'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store/slices/netflixSlice';
import Slider from '../components/Slider';

function Netflix() {
  const [isScrolled, setIsScrolled] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const genresLoaded = useSelector(state => state.netflix.genresLoaded)
  const movies = useSelector(state => state.netflix.movies)
  useEffect(() => {
    dispatch(getGenres())
  })
  useEffect(() => {
    genresLoaded && dispatch(fetchMovies({ type: "all" }))
  }, [genresLoaded])

  window.onscroll = () => {
    setIsScrolled(window.pageXOffset === 0 ? false : true);
    return () => (window.onscroll = null)
  }
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    !currentUser && navigate("/login");
  });
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className='hero'>
        <img src={backgroundImage} alt='background' className='background-image' />
        <div className='container'>
          <div className='logo'>
            <h4>BEHIND HER EYES</h4>
          </div>
          <div className='buttons d-flex'>
            <button className='d-flex align-items-center justify-content-center' onClick={() => navigate('/player')}>
              <FaPlay />Play
            </button>
            <button className='d-flex align-items-center justify-content-center'>
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  )
}
const Container = styled.div`
  height:100vh;
  width:100vw;
  background-color:black;
  .hero{
    position:relative;
    .background-image{
      filter:brightness(60%);
    }
    img{
      height:100vh;
      width:100vw;
    }
    .container{
      position:absolute;
      bottom:5rem;
      .logo{
        h4{
          font-size:5rem;
          margin-left:5rem;
          opacity:80%;
        }
      }
      .buttons{
        margin:5rem;
        gap:2rem;
        button{
          font-size:1.4rem;
          gap:1rem;
          border-radius:0.2rem;
          padding:0.5rem;
          padding-left:2rem;
          padding-right:2.4rem;
          border:none;
          cursor:pointer;
          transition:0.3s ease-in-out;
          &:hover{
            opacity:0.8;
          }
          &:nth-of-type(2){
            background-color:rgba(109,109,110,0.7);
            color:white;
            svg{
              font-size:1.8rem;
            }
          }
        }
      }
    }
  }
`

export default Netflix