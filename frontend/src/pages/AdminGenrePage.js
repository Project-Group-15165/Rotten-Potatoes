import GenreForm from '../components/Forms/GenreForm'
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import useScrollToTop from '../services/useScrollToTop'

function AdminGenrePage() {
    useScrollToTop()
    const {user} = useContext(AuthContext)
    if(user && user.username === "admin"){
        return(<GenreForm />);
    }
    else{
        return<h1>Access Denied!!!</h1>
    }
    
}


export default AdminGenrePage;