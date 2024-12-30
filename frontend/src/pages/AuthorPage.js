import AuthorInfo from "../components/AuthorInfo";
import { useParams } from 'react-router-dom';
import useScrollToTop from '../services/useScrollToTop'

function AuthorPage() {
    useScrollToTop()
    const {authorid} = useParams()
    return (<AuthorInfo authorid={authorid}/>)
}

export default AuthorPage;