import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
/* Layout elements */
import TopContent from './components/Layout/TopContent';
import Header  from './components/Layout/Header';
import Footer from './components/Layout/Footer';
/* Auth pages */
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout'
/* Main pages */
import HomePage from './pages/HomePage'
import DiscoverPage from './pages/DiscoverPage'
import CommunityPage from './pages/CommunityPage'
import AdvancedSearch from './pages/AdvancedSearch'
/* Specific Pages */
import BookPage from './pages/BookPage';
import AuthorPage from './pages/AuthorPage';
import GenrePage from './pages/GenrePage';
/* User Pages */
import ProfilePage from './pages/ProfilePage';
import UserPage from './pages/UserPage';
import UpdateUser from './pages/UpdateUser';
import DeleteUser from './pages/DeleteUser';




function App() {
  return (
    <Router>
      <div id="header-wrap">
        <TopContent />
        <Header />
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<HomePage/>} />
          <Route path="/discover/:page" element={<DiscoverPage/>} />
          <Route path="/community" element={<CommunityPage/>} />
          <Route path="/advanced-search" element={<AdvancedSearch/>} />
          {/* Specific Pages */}
          <Route path="/book/:bookid" element={<BookPage/>} />
          <Route path="/author/author:id" element={<AuthorPage/>} />
          <Route path="/genre/:genreid" element={<GenrePage/>} />
          {/* Auth Pages */}
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/logout" element={<Logout/>} />
          {/* User Pages */}
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/:username" element={<UserPage/>} />
          <Route path="/profile/update" element={<UpdateUser/>} />
          <Route path="/profile/delete" element={<DeleteUser/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
