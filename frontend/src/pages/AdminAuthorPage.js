import AuthorForm from '../components/Forms/AuthorForm'
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

function AdminAuthorPage() {
    const {user} = useContext(AuthContext)
    if(user && user.username === "admin"){
        return(<AuthorForm />);
    }
    else{
        return<h1>Access Denied!!!</h1>
    }
    
}


export default AdminAuthorPage;