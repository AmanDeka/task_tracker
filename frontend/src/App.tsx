// App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import DailyTasksPage from './pages/DailyTasksPage';
import Login from './pages/login';
import Logout from './pages/logout';
import Signup from './pages/signup';
import { useUser } from './hooks/userContext';
import axios from 'axios';

const App: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios({
          url: '/auth/user',
          method: 'GET',
          withCredentials: true,
        });

        const userData = response.data.user;
        if (userData) {
          setUser(userData);
        }

        setLoading(false);
      } catch (error) {
        console.error('Authentication check failed', error);
        setLoading(false);
      }
    };

    checkAuth();
  });


  if (user == null) {
    // User is not authorized
    return (
      <div className="app">
        <nav className="side-menu">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </nav>
        <main className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="side-menu">
        <ul>
          <li>
            <Link to="/">Daily Tasks</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
          <p>Welcome {user.username}</p>
        </ul>
      </nav>

      <main className="content">
        <Routes>
          <Route path="/" element={<DailyTasksPage />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
