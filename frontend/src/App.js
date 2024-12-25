import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
/* Layout elements */
import TopContent from './components/Layout/TopContent';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
/* Auth pages */
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
/* Main pages */
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import CommunityPage from './pages/CommunityPage';
import AdvancedSearch from './pages/AdvancedSearch';
/* Specific Pages */
import BookPage from './pages/BookPage';
import AuthorPage from './pages/AuthorPage';
import GenrePage from './pages/GenrePage';
/* User Pages */
import ProfilePage from './pages/ProfilePage';
import UserPage from './pages/UserPage';
import UpdateUser from './pages/UpdateUser';
import DeleteUser from './pages/DeleteUser';
/* Not Found page */
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div id="header-wrap">
        <AuthProvider>
        <TopContent />
        <Header />
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/discover/:page" element={<DiscoverPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/advanced-search" element={<AdvancedSearch />} />
          {/* Specific Pages */}
          <Route path="/book/:bookid" element={<BookPage />} />
          <Route path="/author/:authorid" element={<AuthorPage />} />
          <Route path="/genre/:genreid/:name" element={<GenrePage />} />
          {/* Auth Pages */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* User Pages */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/profile/update" element={<UpdateUser />} />
          <Route path="/profile/delete" element={<DeleteUser />} />
          {/* Non-existent routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;