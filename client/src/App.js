import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import Movies from './pages/Movies';
import Netflix from './pages/Netflix';
import Player from './pages/Player';
import SignUp from './pages/SignUp';
import TVShows from './pages/TVShows';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/signup' element={<SignUp/>} />
        <Route exact path='/' element={<Netflix/>} />
        <Route exact path='/player' element={<Player/>} />
        <Route exact path='/movies' element={<Movies/>} />
        <Route exact path='/tv' element={<TVShows/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
