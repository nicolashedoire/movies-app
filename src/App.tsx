import React, { useState, useEffect } from 'react';
import MoviesList from './components/moviesList';
import MoviesCount from './components/moviesCount';
import Paginator from './components/paginator';
import './App.scss';
import axios from 'axios';

function App(){

  const [movies, setMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState("");

  useEffect(() => {
   getMovies().then(movies => setMovies(movies));
   getMoviesCount().then(moviesCount => setMoviesCount(moviesCount));
  }, [])

  const getMovies = async () => {
    let response = await axios.get(`https://desolate-journey-34342.herokuapp.com/`);
    return response.data;
  }

  const getMoviesCount = async () => {
    let response = await axios.get(`https://desolate-journey-34342.herokuapp.com/movies/count`);
    return response.data.count;
  }
  

  return (
    <div className="App">
      <MoviesCount count={moviesCount}/>
      <Paginator
        totalCount={moviesCount}
        itemsPerPage={10}
        currentPage={1}
        maxPagesShown={6}
        showPrevButton={true}
        showNextButton={true}
        onPageClick={() => {}}
        onPrevButtonClick={() => {}}
        onNextButtonClick={() => {}}
      />
      <MoviesList movies={movies} />
    </div>
  );
}

export default App;
