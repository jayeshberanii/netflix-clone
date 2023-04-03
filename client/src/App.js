import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import Login from './pages/Login';
import Netflix from './pages/Netflix';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/' element={<Netflix/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
