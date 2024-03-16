import './App.css';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector
import WatchList from './components/WatchList/WatchList';
import Favorite from './components/Favourite/Favourite';
import MovieDetails from './components/MovieDetails/MovieDetails';

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // Access isLoggedIn from Redux store

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={isLoggedIn ? <Home /> : <Navigate to="/" replace />}/> 
          <Route path='/watchlist' element={<WatchList />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/details/:movieId' element={<MovieDetails />} />
          <Route path='*' element={<><code>Something went wrong.</code></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
