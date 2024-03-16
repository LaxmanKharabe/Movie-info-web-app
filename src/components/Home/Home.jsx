import React, { useEffect } from "react";
import './Home.css';
import { useSelector } from "react-redux";
import PopularMovies from "../PopularMovies/PopularMovies";
import Navbar from "../Navbar/Navbar";

const Home = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        console.log(isLoggedIn);
    }, []);

    return (
        <div className="home-container">
            <div className="home-box">
                <Navbar />
                <PopularMovies />
            </div>
        </div>
    );
};

export default Home;
