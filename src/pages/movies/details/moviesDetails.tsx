import React, { useEffect, useState } from "react";
import { Container, Alert, Row, Col } from "reactstrap";
import { NavLink, useParams } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getMovie, deleteMovie } from "../../../api";
import { useHistory } from "react-router-dom";

export default function MoviesDetails() {
  const { id } = useParams();
  const history = useHistory();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [movie, setMovie] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      getMovie(id)
        .then((movie: any) => setMovie(movie))
        .catch((err) => {
          history.push("/error");
        });
    }
  }, []);

  return (
    <Container fluid>
      <NavLink to={`/movies`} className="mr-2">
        <Button className="mt-4">Retour</Button>
      </NavLink>
      <NavLink to={`/movies/${id}/edit`} className="mr-2">
        <Button className="mt-4">Editer</Button>
      </NavLink>
      <Button
        color="danger"
        className="mt-4 mr-2"
        onClick={() => setModal(true)}
      >
        Supprimer
      </Button>
      <a
        target="_blank"
        href={`http://www.allocine.fr/film/fichefilm_gen_cfilm=${movie?.allocine_id}.html`}
      >
        <Button color="primary" className="mt-4">
          Voir la fiche allociné
        </Button>
      </a>
      <Button className="mt-4 ml-2">Je veux le voir</Button>
      <Button className="mt-4 ml-2">Je l'ai déjà vu</Button>
      <Button className="mt-4 ml-2">Acheter le film</Button>
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
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Suppression du film</ModalHeader>
        <ModalBody>
          <h5>Êtes-vous certain de vouloir supprimer ce film ?</h5>
          <p>Ce film ne fera plus parti de l'historique des gens...</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Annuler
          </Button>
          <Button
            color="primary"
            onClick={() =>
              deleteMovie(movie?.id)
                .then((response) => {
                  setModal(false);
                })
                .catch((err) => {
                  setModal(false);
                  alert(err);
                })
            }
          >
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}
