import React, { Component } from "react";
import Axios from "axios";
import { Button, Input, Spinner, Container, Row, Col } from "reactstrap";
import "./styles.scss";

interface Imovie {
  genders?: Array<string>;
  title?: string;
  synopsis?: string;
  date?: string;
  image?: string;
  director?: string;
  duration?: string;
}
type MyProps = {};
type MyState = {
  movie: Imovie;
  page: number;
  isLoading: boolean;
  startPage: number;
  endPage: number;
  timer: number;
};
export default class scraperGenerator extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      movie: {} as Imovie,
      page: 111,
      isLoading: true,
      startPage: 1,
      endPage: 1000000000,
      timer: 1500,
    };
    this.getMovie(this.state.page);
  }

  getMovie = (page: number) => {
    Axios.get(`http://localhost:5000?page=${page}`).then((result) => {
      this.setState({ movie: result.data, isLoading: false });
    });
  };

  handlePageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ page: event.currentTarget.value as number });
  };

  handleStartPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ startPage: event.currentTarget.value as number });
  };

  handleEndPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ endPage: event.currentTarget.value as number });
  };

  handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ timer: event.currentTarget.value as number });
  };

  handleGetMovie = () => {
    this.setState({ isLoading: true });
    this.getMovie(this.state.page);
  };

  startScrapping = () => {
    const { startPage, endPage, timer } = this.state;
    let counter = startPage;
    const interval = setInterval(() => {
      if (counter < endPage) {
        this.getMovie(counter);
        counter++;
      } else {
        clearInterval(interval);
        alert("Le scrapping est terminé !");
      }
    }, timer);
  };

  render() {
    const { movie, page, isLoading, startPage, endPage, timer } = this.state;

    return (
      <Container fluid>
        <Row>
          <Col md={6}>
            <Row className="mb-4 mt-4">
              <Col md={12} className="mb-4">
                <h3>Rechercher le film par id allociné</h3>
              </Col>
              <Col md={6}>
                <Input
                  type="text"
                  id="number-of-page"
                  label="Numéro de page"
                  value={page}
                  onChange={this.handlePageChange}
                />
              </Col>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleGetMovie}
                >
                  Rechercher la fiche
                </Button>
              </div>
            </Row>
            <Row>
              <Col md={12}>
                <h3 className="blue">Options de scrapping</h3>
                <div className="mt-4">
                  <Input
                    type="text"
                    id="start-page"
                    label="Page de démarrage"
                    value={startPage}
                    onChange={this.handleStartPageChange}
                  />
                </div>
                <div className="mt-4">
                  <Input
                    type="text"
                    id="end-page"
                    label="Page d'arrêt"
                    value={endPage}
                    onChange={this.handleEndPageChange}
                  />
                </div>
                <div className="mt-4">
                  <Input
                    type="text"
                    id="timer"
                    label="Temps (ms)"
                    value={timer}
                    onChange={this.handleTimeChange}
                  />
                </div>
                <div className="mt-4">
                  <Button
                    color="primary"
                    onClick={this.startScrapping}
                  >
                    Lancer le scrapping
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <div>
              {isLoading ? (
                <div className="mt-4">
                  <div className="card centered">
                    <Spinner color="secondary" size="lg" />
                  </div>
                </div>
              ) : (
                <React.Fragment>
                  <div className="grid template-zone">
                    <div className="card">
                      <div className="grid card-zone-template">
                        <div>
                          {movie.image ? <img src={movie.image} /> : null}
                        </div>
                        <div>
                          {movie.title ? (
                            <p>
                              <b>Titre du film :</b> {movie.title}
                            </p>
                          ) : null}
                          {movie.date ? (
                            <p>
                              <b>Date du film :</b> {movie.date}
                            </p>
                          ) : null}
                          {movie.duration ? (
                            <p>
                              <b>Durée :</b> {movie.duration}
                            </p>
                          ) : null}
                          {movie.director ? (
                            <p>
                              <b>Réalisateur :</b> {movie.director}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      {movie.synopsis ? (
                        <p>
                          <b>Résumé :</b> {movie.synopsis}
                        </p>
                      ) : null}
                      {movie.genders ? (
                        <ul>
                          {movie.genders.map((gender) => (
                            <li>{gender}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
