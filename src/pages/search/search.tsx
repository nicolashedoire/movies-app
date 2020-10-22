import React, { useState, useEffect } from "react";
import { Input, Row, Col, Button, Container, Form } from "reactstrap";
import { useSelector } from "react-redux";
import { getProfile, getUid } from "../auth/selectors";
import { firestore } from "../../firebase";
import { postSearch } from "../../api";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

export default function Search() {
  const profile = useSelector(getProfile);
  const uid = useSelector(getUid);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (search !== "" && search.length >= 3) {
      postSearch(search).then((result) => {
        setSearchResults(result);
      });
    } else {
      setSearchResults([]);
    }
  }, [search]);

  return (
    <Container>
      <Row className="mt-4">
        <Col md={12} className="mt-4">
          <Input
            type="text"
            placeholder="recherchez un film..."
            value={search}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
          />
          {searchResults.length > 0 ? (
            <div className={`${styles.searchList} mt-2 p-4`}>
              <Row className="mb-4">
                {searchResults.map((movie: any) => {
                  return (
                    <Col md={6} className="mb-4">
                      <NavLink key={movie.id} to={`/movies/${movie.id}`}>
                        <Row>
                          <Col md={3}>
                            <img src={movie.image} width="100" />
                          </Col>
                          <Col md={9}>
                            <p>{movie?.title}</p>
                          </Col>
                        </Row>
                      </NavLink>
                    </Col>
                  );
                })}
              </Row>
            </div>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}
