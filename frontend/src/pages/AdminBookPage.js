import BookForm from '../components/Forms/BookForm'
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

function AdminBookPage() {
    const {user} = useContext(AuthContext)
    if(user && user.username === "admin"){
        return(<BookForm />);
    }
    else{
        return<h1>Access Denied!!!</h1>
    }
    
}


export default AdminBookPage;