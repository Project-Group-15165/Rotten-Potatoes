import { useState, useEffect } from 'react';
import { Card } from 'reactstrap';
import { publicApi } from '../../services/api';
import { Link } from 'react-router-dom';
import './genrestyle.css';

const GenreCard = (props) => {
    const genre = props.genre

    return (
        <Card className="genre-card text-center shadow rounded mx-auto my-3 p-3">
            <Link to={`/genre/${genre.genreid}/${genre.name}`} className="card-title text-decoration-none text-capitalize fw-bold">
                {genre.name}
            </Link>
        </Card>
    );
};

export default GenreCard;
