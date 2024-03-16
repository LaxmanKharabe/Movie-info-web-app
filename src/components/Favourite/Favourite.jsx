// Favorite.jsx

import React from 'react';
import './Favourite.css';
import { useSelector } from 'react-redux';
import { selectSelectedMovie } from '../../redux/slice/movieSlice';
import Navbar from '../Navbar/Navbar';

const Favorite = () => {
    const selectedMovieDetails = useSelector(selectSelectedMovie);

    const getPosterUrl = (path) => {
        const baseUrl = 'https://image.tmdb.org/t/p/w500';
        return `${baseUrl}${path}`;
    };

    return (
        <div>
            <Navbar />
            <div className="fav">
                <h2 style={{textAlign: "center", marginBottom: "10px"}}>Favorites</h2>
                <div className="fav-container">
                
                    {selectedMovieDetails ? (
                        <div className="movie-grid">
                            <div className="headers">
                                <p>Movie Image</p>
                                <p>Movie Title</p>
                                <p>Release Date</p>
                            </div>
                            <div key={selectedMovieDetails.id} className="movie-item">
                                <img src={getPosterUrl(selectedMovieDetails.poster_path)} alt={selectedMovieDetails.title} />
                                <p>{selectedMovieDetails.title}</p>
                                <p>{selectedMovieDetails.release_date}</p>
                            </div>
                        </div>
                    ) : (
                        <p>No movie selected.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Favorite;
