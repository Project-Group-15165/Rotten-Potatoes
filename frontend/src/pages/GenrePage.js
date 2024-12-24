import GenreInfo from "../components/GenreInfo";
import { useParams } from 'react-router-dom';

function GenrePage() {
    const {genreid, name} = useParams()
    return (<GenreInfo genreid={genreid} name={name}/>)
}

export default GenrePage;