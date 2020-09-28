import React, { useState, useEffect } from "react";
import MoviesList from "./components/moviesList";
import MoviesCount from "./components/moviesCount";
import MoviesFilters from "./components/moviesFilters";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import "./App.scss";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState("");

  useEffect(() => {
    getMoviesCount().then((moviesCount) => setMoviesCount(moviesCount));
  }, []);

  const getMovies = async (limit: number, page: number) => {
    let response = await axios.get(
      `https://desolate-journey-34342.herokuapp.com?limit=${limit}&page=${page}`
    );
    return response.data;
  };

  const getMoviesCount = async () => {
    let response = await axios.get(
      `https://desolate-journey-34342.herokuapp.com/movies/count`
    );
    return response.data.count;
  };

  const handleFiltersChanges = (limit: number, page: number) => {
    setMovies([]);
    getMovies(limit, page).then((movies) => setMovies(movies));
  };

  return (
    <Router>
      <div className="App">
        <MoviesCount count={moviesCount} />
        <MoviesFilters count={moviesCount} onChange={handleFiltersChanges} />
        {movies.length > 0 ? (
          <MoviesList movies={movies} />
        ) : (
          <div style={{textAlign: 'center', paddingTop: '15%'}}>
            <Spinner size="lg" color="primary" />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
