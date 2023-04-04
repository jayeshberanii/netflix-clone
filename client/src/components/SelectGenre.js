import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { fetchMoviesByGenre } from '../store/slices/netflixSlice'

function SelectGenre({genres,type}) {
    const dispatch=useDispatch()
  return (
    <Select className='d-flex' onChange={(e)=>dispatch(fetchMoviesByGenre({genre:e.target.value,type}))}>
        {
            genres.map(genre=>{
                return(
                    <option value={genre.id} key={genre.id}>
                        {genre.name}
                    </option>
                )
            })
        }
    </Select>
  )
}
const Select=styled.select`
    margin-left:4rem;
    padding:0.4rem 1rem ;
    cursor:pointer;
    font-siz:1.4rem;
    background-color:rgba(0,0,0,0.4);
    color:white;
`;

export default SelectGenre