import React, { useEffect } from 'react';
import './popularMoives.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../../redux/slice/popularSlice';
import { Link } from 'react-router-dom';

const PopularMovies = () => {
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  function roundToOneDecimalPlace(number) {
    return Math.round(number * 10) / 10;
  }
  const getPosterUrl = (path) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    return `${baseUrl}${path}`;
  };

  return (
    <div className='popular-movies'>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data</p>}
      {data && (
        <div className='popular-movie-list'>
          {data.results.map((movie) => (
            <Link key={movie.id} to={`/details/${movie.id}`} className='movie-link'>
              <div className='bx'>
                <img
                  src={getPosterUrl(movie.poster_path)}
                  alt={movie.title}
                />
                <div className='content'>
                  <h6><span>TMDB</span> <i className="bi bi-star"></i> {roundToOneDecimalPlace(movie.vote_average)}</h6>
                  <h3>{movie.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default PopularMovies;
