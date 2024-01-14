// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import DailyTasksPage from './pages/DailyTasksPage';
import Login from './pages/login';
import Logout from './pages/logout';
import Signup from './pages/signup';
import useAuth from './hooks/useauth';

const App: React.FC = () => {
  const user = useAuth();
  const navigate = useNavigate();

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
            <Route path="/" element={<DailyTasksPage />} />
            <Route path="/logout" element={<Logout />} />
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
