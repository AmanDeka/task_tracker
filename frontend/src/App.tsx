// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DailyTasksPage from './pages/DailyTasksPage';

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
              <Link to="/other">Other Page</Link>
            </li>
          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<DailyTasksPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
