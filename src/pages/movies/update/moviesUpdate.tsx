import React, { useState, useEffect } from "react";
import { Input, Row, Col, Button, Container, Form } from "reactstrap";
import { NavLink, useParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import { getMovie, updateMovie } from "../../../api";

export default function MoviesUpdate() {
  const { id } = useParams();

  const [allocineId, setAllocineId] = useState("");
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [movie, setMovie] = useState<any | null>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newMovie = cloneDeep(movie);
    newMovie.image = image;
    newMovie.title = title;
    newMovie.date = date;
    newMovie.synopsis = synopsis;
    newMovie.allocineId = allocineId;
    updateMovie(newMovie, id).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    if (id) {
      getMovie(id).then((movie) => {
        setAllocineId(movie.allocine_id);
        setTitle(movie.title);
        setImage(movie.image);
        setDate(movie.creation_date);
        setMovie(movie);
        setSynopsis(movie.synopsis);
      });
    }
  }, []);

  return (
    <Container fluid>
      <NavLink to={`/movies/${id}`} className="mr-2">
        <Button className="mt-4">Retour</Button>
      </NavLink>
      <Form onSubmit={handleSubmit}>
        <h3 className="mt-4">Edit Movie</h3>
        <Row className="mt-4">
          <Col md={12} className="mb-4">
            <Input
              type="text"
              placeholder="ID allociné"
              value={allocineId}
              onChange={(e) => setAllocineId(e.currentTarget.value)}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              type="textarea"
              placeholder="Synopsis"
              value={synopsis}
              onChange={(e) => setSynopsis(e.currentTarget.value)}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              type="text"
              placeholder="Image url"
              value={image}
              onChange={(e) => setImage(e.currentTarget.value)}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input type="text" placeholder="date" disabled value={date} />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              type="date"
              placeholder="date"
              value={date}
              onChange={(e) => setDate(e.currentTarget.value)}
            />
          </Col>
          <Col md={12}>
            <Button>Update</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
