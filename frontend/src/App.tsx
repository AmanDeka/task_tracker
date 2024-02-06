// App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import DailyTasksPage from './pages/DailyTasksPage';
import Login from './pages/login';
import Logout from './pages/logout';
import Signup from './pages/signup';
import { useUser } from './hooks/userContext';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { getUser, getDailyTaskPage } from './utils/queryFunctions';
import { User } from './utils/customTypes';

const LoggedIn: React.FC<{ user: User }> = ({ user }) => {

  const { data: dailyTasksPageData } = useQuery({
    queryKey: ['page', 'dailytaskpage'],
    queryFn: getDailyTaskPage,
    placeholderData: null
  })

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
          <Route path="/" element={<DailyTasksPage id = {dailyTasksPageData._id}/>} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </div>
  );
};


const App: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);


  const { data: quser, isSuccess: userSuccess, isError: userError } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    placeholderData: null
  })

  useEffect(() => {
    setUser(quser);
  }, [quser]);



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
    <LoggedIn user={user} />
  );
};

export default App;
