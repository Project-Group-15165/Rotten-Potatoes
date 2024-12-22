import BookInfo from '../components/BookInfo'
import { useParams } from 'react-router-dom';

function BookPage() {
    const {bookid} = useParams();
    return(<BookInfo bookid={bookid}/>);
}

export default BookPage;