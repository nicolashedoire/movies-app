import React, { useState } from "react";
import { Input, Row, Col, Container, Form } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { postMovie } from "../../../api";

export default function MoviesCreate() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    return validateMovie()
      ? postMovie({
          title,
          synopsis,
          creation_date: date,
          image,
          director,
          duration,
        })
      : null;
  };

  const validateMovie = () => {
    if (
      title === "" ||
      synopsis === "" ||
      duration === "" ||
      image === "" ||
      director === "" ||
      date === ""
    ) {
      setModal(true);
      return false;
    }
    return true;
  };

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit}>
        <h3 className="mt-4">Nouveau film</h3>
        <Row className="mt-4">
          <Col md={12} className="mb-4">
            <Input
              type="text"
              placeholder="Titre"
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
            <Input
              type="text"
              placeholder="Date de sortie"
              value={date}
              onChange={(e) => setDate(e.currentTarget.value)}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              type="text"
              placeholder="Durée"
              value={duration}
              onChange={(e) => setDuration(e.currentTarget.value)}
            />
          </Col>
          <Col md={12} className="mb-4">
            <Input
              type="text"
              placeholder="Réalisateur"
              value={director}
              onChange={(e) => setDirector(e.currentTarget.value)}
            />
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
            <Button>Créer</Button>
          </Col>
        </Row>
      </Form>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Informations</ModalHeader>
        <ModalBody>
          Il manque des informations pour enregistrer le film !
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}
