// useAuth.ts
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthData {
  id:number;
  username:string;
}

const useAuth = () => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<AuthData|null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios({
            url:"/auth/user",
            method:"GET",
            withCredentials: true
          });
        const user = response.data.user;
        if (user==null) {
            // Redirect to the login page if the user is not authenticated
            navigate('/login');
        }
        setAuthData( user );
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
