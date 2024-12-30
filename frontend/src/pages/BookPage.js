import BookInfo from '../components/BookInfo'
import { useParams } from 'react-router-dom';
import useScrollToTop from '../services/useScrollToTop'

function BookPage() {
    useScrollToTop()
    const {bookid} = useParams();
    return(<BookInfo bookid={bookid}/>);
}

export default BookPage;