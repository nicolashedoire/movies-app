import axios from "axios";
import { IMovie } from "./types";

export const getMovie = async (id: string) => {
  let response = await axios.get(
    `${process.env.REACT_APP_API_PATH}/movies/${id}`
  );
  return response.data;
};

export const updateMovie = async (movie: IMovie, id: string) => {
  let response = await axios.put(
    `${process.env.REACT_APP_API_PATH}/movies/${id}`,
    movie
  );
  return response.data;
};

export const postMovie = async (movie: IMovie) => {
  let response = await axios.post(
    `${process.env.REACT_APP_API_PATH}/movies`,
    movie
  );
  return response.data;
};

export const getMovies = async (limit: number, page: number, year: number) => {
  let response = await axios.get(
    `${process.env.REACT_APP_API_PATH}/movies?limit=${limit}&page=${page}&year=${year}`
  );
  return response.data;
};

export const getMoviesCount = async (year: number) => {
  let response = await axios.get(
    `${process.env.REACT_APP_API_PATH}/movies/count?year=${year}`
  );
  return response.data.count;
};

export const getHistorical = async (uid: string) => {
  let response = await axios.get(
    `${process.env.REACT_APP_API_PATH}/historical?uid=${uid}`
  );
  return response.data;
};

export const getMoviesSeen = async (uid: string) => {
  let response = await axios.get(
    `${process.env.REACT_APP_API_PATH}/historical/seen?uid=${uid}`
  );
  return response.data;
};

export const getMoviesToWatch = async (uid: string) => {
  let response = await axios.get(
    `${process.env.REACT_APP_API_PATH}/historical/towatch?uid=${uid}`
  );
  return response.data;
};

export const unsubscribeMoviesToWatch = async (
  uid: string,
  movieId: string
) => {
  let response = await axios.put(
    `${process.env.REACT_APP_API_PATH}/historical/towatch/unsubscribe?uid=${uid}`,
    { movieId }
  );
  return response.data;
};

export const getCountMoviesToWatch = async (uid: string) => {
  let response = await axios.get(
    `${process.env.REACT_APP_API_PATH}/historical/count/towatch?uid=${uid}`
  );
  return response.data;
};

export const getCountMoviesSeen = async (uid: string) => {
  let response = await axios.get(
    `${process.env.REACT_APP_API_PATH}/historical/count/seen?uid=${uid}`
  );
  return response.data;
};

export const postHistorical = async (params: {
  action: string;
  movieId: string;
  userId: string;
}) => {
  let response = await axios.post(
    `${process.env.REACT_APP_API_PATH}/historical`,
    params
  );
  return response.data;
};

export const putHistoricalRating = async ({
  rating,
  movieId,
}: {
  rating: number;
  movieId: string;
}) => {
  console.log(rating, movieId);
  let response = await axios.put(
    `${process.env.REACT_APP_API_PATH}/historical/rating/${movieId}`,
    {
      rating: rating,
    }
  );
  return response.data;
};
