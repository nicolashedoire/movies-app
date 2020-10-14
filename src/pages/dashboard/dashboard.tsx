import React, { useContext, useEffect, useState } from "react";
import { Container, Button } from "reactstrap";
import { AuthContext } from "../../index";
import {
  getCountMoviesToWatch,
  getCountMoviesSeen,
  getMoviesToWatch,
  getMoviesSeen,
  putHistoricalRating,
  unsubscribeMoviesToWatch,
} from "../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Rating from "../../components/sentimentRating";
import { cloneDeep } from "lodash";

function RatingContainer(props: any) {
  const handleRate = (rating: number) => {
    putHistoricalRating({ rating, movieId: props.movieId });
  };

  return <Rating rate={props.rating} onRating={handleRate} />;
}

export default function Dashboard() {
  const moviesCount: number = useContext(AuthContext).historicalCount;
  const [moviesToWatch, setMoviesToWatch] = useState([]);
  const [moviesSeen, setMoviesSeen] = useState([]);
  const [countMoviesToWatch, setCountMoviesToWatch] = useState(0);
  const [countMoviesSeen, setCountMoviesSeen] = useState(0);
  const uid = useSelector((state: RootState) => state.firebase.auth.uid);

  useEffect(() => {
    getCountMoviesToWatch(uid).then((response) =>
      setCountMoviesToWatch(response)
    );
    getMoviesToWatch(uid).then((response) => setMoviesToWatch(response));
    getCountMoviesSeen(uid).then((response) => setCountMoviesSeen(response));
    getMoviesSeen(uid).then((response) => setMoviesSeen(response));
  }, []);

  return (
    <Container fluid>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0 }}
        className="mt-4"
      >
        Total de films : {moviesCount ? moviesCount : 0}
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0 }}
        className="mt-4"
      >
        Films vus : {countMoviesSeen ? countMoviesSeen : 0}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0 }}
        className="mt-4 d-flex"
        style={{ overflow: "scroll" }}
      >
        {moviesSeen.length > 0
          ? moviesSeen.map((movie: any, index: number) => {
              const movieId = cloneDeep(movie.id);
              return (
                <div
                  key={`movieSeen${index}`}
                  className="text-center m-2 border p-2"
                  style={{ minWidth: "250px" }}
                >
                  <p>{movie?.title}</p>
                  <div>
                    <img width="90" src={movie.image} title={movie.title} />
                  </div>
                  <div className="mt-4">
                    <RatingContainer rating={movie.rating} movieId={movie.id} />
                  </div>
                  <NavLink to={`/movies/${movie.id}`}>
                    <Button className="mt-3">Voir le détail</Button>
                  </NavLink>
                </div>
              );
            })
          : null}
      </motion.div>
      <h2 className="mt-4">
        Films à voir : {countMoviesToWatch ? countMoviesToWatch : 0}
      </h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0 }}
        className="mt-4 d-flex"
        style={{ overflow: "scroll" }}
      >
        {moviesToWatch.length > 0
          ? moviesToWatch.map((movie: any, index: number) => {
              return (
                <div
                  key={`movieToWatch_${index}`}
                  className="text-center m-2 border p-2"
                  style={{ minWidth: "250px" }}
                >
                  <p>{movie?.title}</p>
                  <div>
                    <img width="90" src={movie.image} title={movie.title} />
                  </div>
                  <Button
                    className="mt-3"
                    onClick={() =>
                      unsubscribeMoviesToWatch(uid, movie.id).then(
                        (response) => {
                          getCountMoviesToWatch(uid).then((response) =>
                            setCountMoviesToWatch(response)
                          );
                          getMoviesToWatch(uid).then((response) =>
                            setMoviesToWatch(response)
                          );
                        }
                      )
                    }
                  >
                    Je ne suis plus intéressé
                  </Button>
                </div>
              );
            })
          : null}
      </motion.div>
    </Container>
  );
}
