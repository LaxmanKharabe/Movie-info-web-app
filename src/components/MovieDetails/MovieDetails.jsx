import React, { useEffect, useState } from 'react';
import './MovieDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchMovieDetails, selectMovieDetails, addToWatchlist, addToFavorites, setSelectedMovie } from '../../redux/slice/movieSlice';
import Navbar from '../Navbar/Navbar';
import PopularMovies from '../PopularMovies/PopularMovies';

const MovieDetails = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch();
    const movieDetails = useSelector(selectMovieDetails);
    const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
    const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);

    const getPosterUrl = (path) => {
        const baseUrl = 'https://image.tmdb.org/t/p/w500';
        return `${baseUrl}${path}`;
    };
    function roundToOneDecimalPlace(number) {
        return Math.round(number * 10) / 10;
      }
    useEffect(() => {
        dispatch(fetchMovieDetails(movieId));
    }, [dispatch, movieId]);

    const handleAddToWatchlist = () => {
        dispatch(addToWatchlist(movieId));
        setIsAddedToWatchlist(true);
    };

    const handleAddToFavorites = () => {
        dispatch(addToFavorites(movieId));
        setIsAddedToFavorites(true);
        dispatch(setSelectedMovie(movieDetails));
    };

    if (!movieDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className='details-container'>
            <Navbar />
            <div className="backdrop_path">
                <img
                    src={getPosterUrl(movieDetails.backdrop_path)}
                    alt={movieDetails.title}
                />
            </div>
            <div className="movie-details">
                <div className="movie-details-box">
                    <img
                        src={getPosterUrl(movieDetails.poster_path)}
                        alt={movieDetails.title}
                    />
                </div>
                <div className="details">
                    <div className="title">
                        <h3><span>Title: </span>{movieDetails.title}</h3>
                    </div>
                    <div className="userScore">
                        <span>Vote: </span>{movieDetails.vote_count} and <span>Rating: {roundToOneDecimalPlace(movieDetails.vote_average)}</span>
                    </div>
                    <div className="overview">
                        <h3>Overview</h3>
                        <p>{movieDetails.overview}</p>
                    </div>
                    <div className="release_date">
                        <h4>Release date: </h4>
                        <span> {movieDetails.release_date}</span>
                    </div>
                    <div className="btn-group" style={{ textAlign: "center" }}>
                        <div className="fav">
                            <button className="btn" onClick={handleAddToWatchlist}>Add to Watchlist</button>
                            {isAddedToWatchlist && <p style={{ fontSize: "10px", color: "red" }}>Added to Watchlist</p>}
                        </div>
                        <div className="wat">
                            <button className="btn" onClick={handleAddToFavorites}>Add to Favorites</button>
                            {isAddedToFavorites && <p style={{ fontSize: "10px", color: "red" }}>Added to Favorites</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="popuLa">
            <PopularMovies />
            </div>
        </div>
    );
};

export default MovieDetails;