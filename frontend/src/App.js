import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
/* Layout components */
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
          <Route path="/" exact component={HomePage} />
          <Route path="/discover/:page" exact component={DiscoverPage} />
          <Route path="/community" exact component={CommunityPage} />
          <Route path="/advanced-search" exact component={AdvancedSearch} />
          {/* Specific Pages */}
          <Route path="/book/:bookid" exact component={BookPage} />
          <Route path="/author/author:id" exact component={AuthorPage} />
          <Route path="/genre/:genreid" exact component={GenrePage} />
          {/* Auth Pages */}
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          {/* User Pages */}
          <Route path="/profile" component={ProfilePage} />
          <Route path="/:username" component={UserPage} />
          <Route path="/profile/update" exact component={UpdateUser} />
          <Route path="/profile/delete" exact component={DeleteUser} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
