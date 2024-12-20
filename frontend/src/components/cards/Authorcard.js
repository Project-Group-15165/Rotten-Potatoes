import { useState, useEffect } from 'react';
import { Card, CardImg } from 'reactstrap';
import { publicApi } from '../../services/api';
import { Link } from 'react-router-dom';
import './cardstyle.css';

const AuthorCard = (props) => {
    const authorid = props.authorid
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const fetchAuthor = async (authorid) => {
        try {
            const response = await publicApi.get(`/author/get/${authorid}`);
            setAuthor(response.data); // Set the Book state with the fetched data
        } catch (error) {
            console.error('Failed to fetch Author', error);
        }
        };

        fetchAuthor(authorid);
    }, [authorid]);
    if(!author){
        return (<h1>Loading...</h1>)
    }

    return (
        <Card className="card author-card mx-auto my-3">
          <CardImg src={author.image} alt={author.name} className="card-img" />
          <div className="card-title-container">
            <Link to={`/author/${author.authorid}`}>{author.name}</Link>
          </div>
        </Card>
      );
}

export default AuthorCard;
