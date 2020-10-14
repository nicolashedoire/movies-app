import React, { useState, useContext } from "react";
import { Spinner, Container } from "reactstrap";
import MoviesList from "../../../components/moviesList";
import MoviesCount from "../../../components/moviesCount";
import MoviesFilters from "../../../components/moviesFilters";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import {
  getMovies,
  getMoviesCount,
  postHistorical,
  putHistorical,
  getHistorical,
} from "../../../api";
import { AuthContext } from "../../../index";

export default function Movies() {
  const context: any = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState("");
  const uid = useSelector((state: RootState) => state.firebase.auth.uid);

  const handleFiltersChanges = (limit: number, page: number, year: number) => {
    setMovies([]);
    getMovies(limit, page, year).then((movies) => setMovies(movies));
    getMoviesCount(year).then((moviesCount) => setMoviesCount(moviesCount));
  };

  const handleOnActionClick = (params: { action: string; movieId: string }) => {
    const historicalExists = context.historical.filter((element: any) => element.movie_id === params.movieId);

    if(historicalExists.length > 0){
      putHistorical({ ...params, userId: uid }).then(() => {
        getHistorical(uid).then((response) => {
          context.setHistorical(response);
        });
      });
    }else{
      postHistorical({ ...params, userId: uid }).then(() => {
        getHistorical(uid).then((response) => {
          context.setHistorical(response);
        });
      });
    }
  };

  return (
    <Container fluid>
      <MoviesCount count={moviesCount} />
      <MoviesFilters count={moviesCount} onChange={handleFiltersChanges} />
      {movies.length > 0 ? (
        <MoviesList movies={movies} onActionClick={handleOnActionClick} />
      ) : (
        <div style={{ textAlign: "center", paddingTop: "15%" }}>
          <Spinner size="lg" color="primary" />
        </div>
      )}
    </Container>
  );
}
