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
  unsubscribeMoviesSeen,
  getHistorical,
  getStatistics,
} from "../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Rating from "../../components/rating";
import { cloneDeep } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

export default function Dashboard() {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  const context: any = useContext(AuthContext);
  const moviesCount: number = context.historicalCount;
  const statistics: Array<any> = context.statistics;
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
    getStatistics(uid).then((response) => context.setStatistics(response));
  }, []);

  useEffect(() => {}, [statistics]);

  const handleRate = (rating: number, movieId: string) => {
    putHistoricalRating({ rating, movieId }).then(() => {
      getMoviesSeen(uid).then((response) => setMoviesSeen(response));
      getStatistics(uid).then((response) => context.setStatistics(response));
    });
  };

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
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0 }}
        className="mt-4"
      >
        Films vus : {countMoviesSeen ? countMoviesSeen : 0}
      </motion.h3>
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
                  <div className="text-right">
                    <FontAwesomeIcon
                      size="1x"
                      icon={faTimes}
                      className="icon-color pointer"
                      onClick={() => {
                        unsubscribeMoviesSeen(uid, movie.id).then(
                          (response) => {
                            getHistorical(uid).then((response) => {
                              context.setHistorical(response);
                            });
                            getCountMoviesSeen(uid).then((response) =>
                              setCountMoviesSeen(response)
                            );
                            getMoviesSeen(uid).then((response) =>
                              setMoviesSeen(response)
                            );
                          }
                        );
                      }}
                    />
                  </div>
                  <p>{movie?.title}</p>
                  <div>
                    <img width="90" src={movie.image} title={movie.title} />
                  </div>
                  <div className="mt-4">
                    <Rating
                      value={movie.rating}
                      size={16}
                      onChange={(e: any) => handleRate(e, movie.id)}
                    />
                  </div>
                  <NavLink to={`/movies/${movie.id}`}>
                    <Button className="mt-3">Voir le détail</Button>
                  </NavLink>
                </div>
              );
            })
          : null}
      </motion.div>
      <BarChart
        width={600}
        height={300}
        data={statistics}
        margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="rating" />
        <YAxis />
        <Legend />
        <Tooltip
          labelFormatter={function (value) {
            return `Note : ${value}`;
          }}
        />
        <Bar dataKey="count" name="Nombre de film(s)" fill="#2ecc71" />
      </BarChart>
      <motion.h3 className="mt-4">
        Films à voir : {countMoviesToWatch ? countMoviesToWatch : 0}
      </motion.h3>
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
                          getHistorical(uid).then((response) => {
                            context.setHistorical(response);
                          });
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
                  <NavLink to={`/movies/${movie.id}`}>
                    <Button className="mt-3">Voir le détail</Button>
                  </NavLink>
                </div>
              );
            })
          : null}
      </motion.div>
      <motion.h3 className="mt-4">Films de la semaine : --</motion.h3>
    </Container>
  );
}
