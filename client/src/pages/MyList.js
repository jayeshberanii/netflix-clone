import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import CardSlider from '../components/CardSlider'
import Navbar from '../components/Navbar'
import NotAvailable from '../components/NotAvailable'
import { getMyPlayList } from '../store/slices/netflixSlice'
import { firebaseAuth } from '../utils/firebase-config'

function MyList() {
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const movies = useSelector(state => state.netflix.myPlayList)
    const[email,setEmail]=useState('')
  
    useEffect(()=>{
        email && dispatch(getMyPlayList(email))
    },[email])
    window.onscroll = () => {
        setIsScrolled(window.pageXOffset === 0 ? false : true);
        return () => (window.onscroll = null)
    }
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        currentUser && setEmail(currentUser.email)
        !currentUser && navigate("/login");
    });
    return (
        <Container>
            <div className='navbar'>
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className='data'>
                {
                    movies.length ? <CardSlider title="My PlayList" data={movies} />:
                    <NotAvailable />
                }
            </div>
        </Container>
    )
}
const Container =styled.div`
    .data{
        margin-top:6rem;
        .not-available{
            text-align:center;
            color:white;
            margin-top:4rem;  
        }
    }
`;

export default MyList