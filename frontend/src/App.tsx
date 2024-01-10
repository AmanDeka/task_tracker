// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DailyTasksPage from './pages/DailyTasksPage';
import Login from './pages/login';
import Logout from './pages/logout';
import axios from 'axios';
import useAuth from './hooks/useauth';

const App =  () => {
  const {authData} = useAuth();
  return (
      <div className="app">
        <nav className="side-menu">
          <ul>
            <li>
              <Link to="/">Daily Tasks</Link>
            </li>

            {(authData == null)
            ?(
            <li>
              <Link to="/login">Login</Link>
            </li>
            )
            :(
            <>
            <Link to='/logout'>Logout</Link>
            <p>Welcome {authData.username}</p>
            </>
            )}

          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<DailyTasksPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout/>}/>
          </Routes>
        </main>
      </div>
  );
};

export default App;
