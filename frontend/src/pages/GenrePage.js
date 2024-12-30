import GenreInfo from "../components/GenreInfo";
import { useParams } from 'react-router-dom';
import useScrollToTop from '../services/useScrollToTop'

function GenrePage() {
    useScrollToTop()
    const {genreid, name} = useParams()
    return (<GenreInfo genreid={genreid} name={name}/>)
}

export default GenrePage;