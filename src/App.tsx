import React, { useState, useEffect } from 'react';
import MoviesList from './components/moviesList';
import './App.scss';
import axios from 'axios';

function App(){

  const [movies, setMovies] = useState([]);

  useEffect(() => {
   getMovies().then(movies => setMovies(movies));
  }, [])

  const getMovies = async () => {
    let response = await axios.get(`https://desolate-journey-34342.herokuapp.com/`);
    return response.data;
  }

  return (
    <div className="App">
      <MoviesList movies={movies} />
    </div>
  );
}

export default App;
