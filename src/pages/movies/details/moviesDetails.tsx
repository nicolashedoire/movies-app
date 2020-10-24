import React, { useEffect, useState, useContext } from "react";
import { Container, Alert, Row, Col } from "reactstrap";
import { NavLink, useParams } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { getMovie, deleteMovie } from "../../../api";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../index";
import { postHistorical, putHistorical, getHistorical } from "../../../api";

export default function MoviesDetails() {
  const context: any = useContext(AuthContext);
  const historical: Array<any> = context.historical;
  const uid = useSelector((state: RootState) => state.firebase.auth.uid);
  const { id } = useParams();
  const history = useHistory();

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [movie, setMovie] = useState<any | null>(null);
  const [isInHistorical, setIsInHistorical] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      getMovie(id)
        .then((movie: any) => setMovie(movie))
        .catch((err) => {
          history.push("/error");
        });
    }
  }, []);

  useEffect(() => {
    if (movie && historical.length > 0) {
      const finded = historical.filter(
        (element) => element.movie_id === movie.id
      );
      if (finded) {
        setIsInHistorical(finded[0]);
      }
    }
  }, [movie, historical]);

  useEffect(() => {
    console.log(isInHistorical)
  }, [isInHistorical]);

  const actionClick = (params: { action: string; movieId: string }) => {
    const historicalExists = context.historical.filter(
      (element: any) => element.movie_id === params.movieId
    );

    if (historicalExists.length > 0) {
      putHistorical({ ...params, userId: uid }).then(() => {
        getHistorical(uid).then((response) => {
          context.setHistorical(response);
        });
      });
    } else {
      postHistorical({ ...params, userId: uid }).then(() => {
        getHistorical(uid).then((response) => {
          context.setHistorical(response);
        });
      });
    }
  };

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
      {isInHistorical?.was_seen ? (
        <Button disabled className="mt-4 ml-2" color="primary">
          Je l'ai vu
        </Button>
      ) : (
        <Button
          className="mt-4 ml-2"
          onClick={() => actionClick({ action: "A", movieId: movie.id })}
        >
          Je l'ai vu
        </Button>
      )}
      {isInHistorical?.to_watch ? (
        <Button disabled className="mt-4 ml-2" color="primary">
          Je veux le voir
        </Button>
      ) : (
        <Button
          className="mt-4 ml-2"
          onClick={() => actionClick({ action: "B", movieId: movie.id })}
        >
          Je veux le voir
        </Button>
      )}
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
