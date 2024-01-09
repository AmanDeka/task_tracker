// useAuth.ts
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthData {
  user: string | null;
}

const useAuth = () => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<AuthData>({ user: null });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios({
            url:"/auth/user",
            method:"GET",
            withCredentials: true
          });
        const user = response.data.user;
        setAuthData({ user });
        console.log("Yo",user);
        if (user==null) {
          // Redirect to the login page if the user is not authenticated
          navigate('/login');
        }
      } catch (error) {
        console.error('Authentication check failed', error);
        // Handle error as needed
      }
    };

    checkAuth();
  }, [navigate]);

  return { authData };
};

export default useAuth;
