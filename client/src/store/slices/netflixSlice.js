import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMBD_BASE_URL } from "../../utils/contants";

const NetflixSlice = createSlice({
    name: "NetflixSlice",
    initialState: {
        movies: [],
        genresLoaded: false,
        genres: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
        builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
});

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const { data: { genres } } = await axios.get(
        `${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    return genres
});

export const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach(movie => {
        const movieGenres = []
        movie.genre_ids.forEach(genre => {
            const name = genres.find(({ id }) => id === genre)
            name && movieGenres.push(name.name)
        })
        movie?.backdrop_path && moviesArray.push({
            id: movie.id,
            name: movie?.original_name ? movie.original_name : movie.original_title,
            image: movie.backdrop_path,
            genres: movieGenres.slice(0, 3)
        })
    });
}

export const getRawData = async (api, genres, paging) => {
    const movieArray = []
    for (let i = 1; movieArray.length < 60 && i < 10; i++) {
        if (paging) {
            const { data: { results } } = await axios.get(`${api}&page=${i}`)
            createArrayFromRawData(results, movieArray, genres)
        } else {
            const { data: { results } } = await axios.get(`${api}`)
            createArrayFromRawData(results, movieArray, genres)
        }
       
    }
    return movieArray;
}

export const fetchMovies = createAsyncThunk('netflix/trending', async ({ type }, thunkApi) => {
    const { netflix: { genres } } = thunkApi.getState()
    return getRawData(`${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true)
    // return getRawData(`${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genres}`)
})

export const fetchMoviesByGenre = createAsyncThunk('netflix/moviesByGenre', async ({ genre, type }, thunkApi) => {
    const { netflix: { genres } } = thunkApi.getState()
    // return getRawData(`${TMBD_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true)
    return getRawData(`${TMBD_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`, genres)
})

export default NetflixSlice.reducer;
export const { } = NetflixSlice.actions;
