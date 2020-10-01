import React, { useState, useEffect } from "react";
import MoviesList from "./components/moviesList";
import MoviesCount from "./components/moviesCount";
import MoviesFilters from "./components/moviesFilters";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import "./App.scss";
import axios from "axios";

import NavBar from './components/navbar';

function App() {
  const [movies, setMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState("");

  useEffect(() => {}, []);

  const getMovies = async (limit: number, page: number, year: number) => {
    let response = await axios.get(
      `https://desolate-journey-34342.herokuapp.com?limit=${limit}&page=${page}&year=${year}`
    );
    return response.data;
  };

  const getMoviesCount = async (year: number) => {
    let response = await axios.get(
      `https://desolate-journey-34342.herokuapp.com/movies/count?year=${year}`
    );
    return response.data.count;
  };

  const handleFiltersChanges = (limit: number, page: number, year: number) => {
    setMovies([]);
    getMovies(limit, page, year).then((movies) => setMovies(movies));
    getMoviesCount(year).then((moviesCount) => setMoviesCount(moviesCount));
  };

  return (
    <Router>
      <div className="App">
        <NavBar/>
        <MoviesCount count={moviesCount} />
        <MoviesFilters count={moviesCount} onChange={handleFiltersChanges} />
        {movies.length > 0 ? (
          <MoviesList movies={movies} />
        ) : (
          <div style={{ textAlign: "center", paddingTop: "15%" }}>
            <Spinner size="lg" color="primary" />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
