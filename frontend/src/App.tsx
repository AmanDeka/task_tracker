// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DailyTasksPage from './pages/DailyTasksPage';
import Login from './pages/login';

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="side-menu">
          <ul>
            <li>
              <Link to="/">Daily Tasks</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<DailyTasksPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
