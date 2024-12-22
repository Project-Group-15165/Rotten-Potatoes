import AuthorInfo from "../components/AuthorInfo";
import { useParams } from 'react-router-dom';

function AuthorPage() {
    const {authorid} = useParams()
    return (<AuthorInfo authorid={authorid}/>)
}

export default AuthorPage;