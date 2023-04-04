import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import NotAvailable from '../components/NotAvailable'
import SelectGenre from '../components/SelectGenre'
import Slider from '../components/Slider'
import { fetchMovies, getGenres } from '../store/slices/netflixSlice'
import { firebaseAuth } from '../utils/firebase-config'

function TVShows() {
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const genresLoaded = useSelector(state => state.netflix.genresLoaded)
    const movies = useSelector(state => state.netflix.movies)
    const genres = useSelector(state => state.netflix.genres)
    const[movieList,setMovieList]=useState([])
    useEffect(() => {
        dispatch(getGenres())
    },[])
    useEffect(()=>{
        setMovieList(movies)
    },[movies])
    useEffect(() => {
        genresLoaded && dispatch(fetchMovies({ type: "tv" }))
    },[genresLoaded])

    window.onscroll = () => {
        setIsScrolled(window.pageXOffset === 0 ? false : true);
        return () => (window.onscroll = null)
    }
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        !currentUser && navigate("/login");
    });
    return (
        <Container>
            <div className='navbar'>
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className='data'>
            <SelectGenre genres={genres} type="tv" />
                {
                    movies.length ? <Slider movies={movieList} />:
                    <NotAvailable />
                }
            </div>
        </Container>
    )
}
const Container =styled.div`
    .data{
        margin-top:8rem;
        .not-available{
            text-align:center;
            color:white;
            margin-top:4rem;  
        }
    }
`;

export default TVShows