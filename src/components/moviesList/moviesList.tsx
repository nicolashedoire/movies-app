import React, { useContext } from "react";
import { IMovie } from "./types";
import { Row, Col, Button, Container } from "reactstrap";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../index";

export default function MoviesList({
  movies,
  onActionClick,
}: {
  movies: Array<IMovie>;
  onActionClick: Function;
}) {
  const historical: Array<any> = useContext(AuthContext).historical;

  return (
    <Container fluid>
      <Row>
        {movies.map((movie) => {
          const isInHistorical = historical.filter(
            (element) => element.movie_id === movie.id
          );
          const wasSeen = isInHistorical[0] ? isInHistorical[0].was_seen : null;
          const toWatch = isInHistorical[0] ? isInHistorical[0].to_watch : null;
          return movie.title ? (
            <Col md={3} key={movie.id}>
              <motion.div
                className={styles.movie}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0 }}
              >
                <NavLink to={`/movies/${movie.id}`}>
                  <p className={styles.title}>{movie.title}</p>
                  <img className={styles.image} src={movie.image} width="100" />
                  {movie.creation_date ? (
                    <p className={styles.date}>{movie.creation_date}</p>
                  ) : (
                    <p className={styles.date}>Date inconnue...</p>
                  )}
                </NavLink>
                <div className="pb-4">
                  {wasSeen ? (
                    <Button disabled className="mr-2" color="primary">
                      Je l'ai vu
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        onActionClick({ action: "A", movieId: movie.id })
                      }
                      className="mr-2"
                    >
                      Je l'ai vu
                    </Button>
                  )}
                  {toWatch ? (
                    <Button disabled color="primary">
                      Je veux le voir
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        onActionClick({ action: "B", movieId: movie.id })
                      }
                    >
                      Je veux le voir
                    </Button>
                  )}
                </div>
              </motion.div>
            </Col>
          ) : null;
        })}
      </Row>
    </Container>
  );
}
