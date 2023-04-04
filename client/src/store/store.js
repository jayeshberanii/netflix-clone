import {
    configureStore,
    createAsyncThunk
} from '@reduxjs/toolkit'
import { API_KEY, TMBD_BASE_URL } from '../utils/contants'
import netflixSlice from './slices/netflixSlice'
import axios from 'axios'

export const getGenres=createAsyncThunk('netflix/genres',async()=>{
    const {data}=await axios.get(`${TMBD_BASE_URL}/genre/movie/list?api_key${API_KEY}`)
    console.log(data);
})

const store=configureStore({
    reducer:{
        netflix:netflixSlice
    }
})

export default store