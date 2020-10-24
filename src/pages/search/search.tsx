import React, { useState, useEffect } from "react";
import { Input, Row, Col, Container, Alert } from "reactstrap";
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
  const [type, setType] = useState("title");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (search !== "" && search.length >= 3) {
      postSearch(search, type).then((result) => {
        setSearchResults(result);
      });
    } else {
      setSearchResults([]);
    }
  }, [search]);

  return (
    <Container fluid style={{ margin: 0, padding: 0 }}>
      <div className={styles.searchContainer}>
        <div className={styles.filtersContainer}>
          <div className={styles.filters}>
            <Container fluid>
              <label className="mt-4">Recherche par</label>
              <Input
                type="select"
                value={type}
                onChange={(e) => {
                  setType(e.currentTarget.value);
                }}
              >
                <option value="title">Titre</option>
                <option value="allocine_id">Identifiant Allociné</option>
              </Input>
            </Container>
          </div>
        </div>
        <Container fluid>
          <Row className="mt-4">
            <Col md={12} className="mt-4">
              {type === "title" ? (
                <Input
                  type="text"
                  placeholder="recherchez un film par titre"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.currentTarget.value);
                  }}
                />
              ) : (
                <Input
                  type="number"
                  placeholder="recherchez un film avec un id allociné"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.currentTarget.value);
                  }}
                />
              )}
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
                                <p>ID : {movie?.allocine_id}</p>
                              </Col>
                            </Row>
                          </NavLink>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              ) : (
                <div className={`${styles.searchList} mt-2 p-4`}>
                  <Alert color="secondary">Aucun résultats</Alert>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
}
