import React from 'react';
import { IMovie } from './types';
import { Row, Col } from 'reactstrap';
import styles from './styles.module.scss';

export default function MoviesList({
    movies
}: {
    movies: Array<IMovie>
}) {
    return (
        <Row>
            {
            movies.map(movie => movie.title ? <Col md={3} key={movie.id}>
                <div className={styles.movie}>
                    <p className={styles.title}>{movie.title}</p>
                    <img className={styles.image} src={movie.image} width="100"/>
                    {movie.creation_date ? 
                    <p className={styles.date}>{movie.creation_date}</p> : 
                    <p className={styles.date}>Date inconnue...</p>}
                </div>
            </Col> : null)
            }
        </Row>
    )
}
