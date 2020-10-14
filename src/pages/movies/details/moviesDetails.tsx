import React, { useEffect, useState } from "react";
import { Button, Container, Alert, Row, Col } from "reactstrap";
import { NavLink, useParams } from "react-router-dom";
import { getMovie } from "../../../api";

export default function MoviesDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      getMovie(id).then((movie: any) => setMovie(movie));
    }
  }, []);

  return (
    <Container fluid>
      <NavLink to={`/movies`} className="mr-2">
        <Button className="mt-4">Retour</Button>
      </NavLink>
      <NavLink to={`/movies/${id}/edit`} className="mr-2">
        <Button className="mt-4">Edit</Button>
      </NavLink>
      <a
        target="_blank"
        href={`http://www.allocine.fr/film/fichefilm_gen_cfilm=${movie?.allocine_id}.html`}
      >
        <Button color="primary" className="mt-4">
          Voir la fiche allociné
        </Button>
      </a>
      {movie ? (
        <Row className="mt-4">
          <Col md={4}>
            <h1>{movie?.title}</h1>
            <p className="text-justify">{movie?.synopsis}</p>
          </Col>
          <Col md={4}>
            {movie.image ? (
              <img src={movie?.image} width="200" />
            ) : (
              <Alert color="danger">Ce film n'a pas encore d'image...</Alert>
            )}
          </Col>
          <Col md={4}>
            {movie.creation_date ? (
              <p>Date de sortie : {movie?.creation_date}</p>
            ) : (
              <Alert color="danger">Pas de date de sortie...</Alert>
            )}
            {movie.duration ? (
              <p>Durée : {movie?.duration}</p>
            ) : (
              <Alert color="danger">Pas de durée...</Alert>
            )}
            {movie.director ? (
              <p>Réalisateur : {movie?.director}</p>
            ) : (
              <Alert color="danger">Pas de réalisateur...</Alert>
            )}
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}
