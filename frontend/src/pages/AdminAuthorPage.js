import AuthorForm from '../components/Forms/AuthorForm'
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import useScrollToTop from '../services/useScrollToTop'

function AdminAuthorPage() {
    useScrollToTop()
    const {user} = useContext(AuthContext)
    if(user && user.username === "admin"){
        return(<AuthorForm />);
    }
    else{
        return<h1>Access Denied!!!</h1>
    }
    
}


export default AdminAuthorPage;