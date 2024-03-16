import React, { useEffect, useState } from 'react';
import './WatchList.css';
import { useSelector } from 'react-redux';
import { selectWatchlist } from '../../redux/slice/movieSlice';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

const Watchlist = () => {
    const watchlist = useSelector(selectWatchlist);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovieDetails = async () => {
            const moviePromises = watchlist.map(async (movieId) => {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=9b5a765865f5d87b08d3223dd5ef5a6c`);
                const data = await response.json();
                return data;
            });
            const moviesData = await Promise.all(moviePromises);
            setMovies(moviesData);
        };

        getMovieDetails();
    }, [watchlist]);

    return (
        <div>
            <Navbar />
            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Watch List</h2>
            <div className="watch-list-container">

                {movies.length === 0 ? (
                    <p>No movies added yet.</p>
                ) : (
                    <div className="movie-grid">
                        <div className="headers">
                            <p>Movie Image</p>
                            <p>Movie Title</p>
                            <p>Release Date</p>
                        </div>
                        {movies.map((movie) => (
                            <div key={movie.id} className="movie-item">
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                                <p>{movie.title}</p>
                                <p>{movie.release_date}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Watchlist;
