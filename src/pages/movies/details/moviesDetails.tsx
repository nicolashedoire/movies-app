import React from "react";
import { Button, Container } from "reactstrap";
import { NavLink, useParams } from "react-router-dom";

export default function MoviesDetails() {
  const { id } = useParams();

  return (
    <Container fluid>
      <NavLink to={`/movies/${id}/edit`}>
        <Button className="mt-4">Edit</Button>
      </NavLink>
    </Container>
  );
}
