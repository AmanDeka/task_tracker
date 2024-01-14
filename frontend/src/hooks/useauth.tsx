// useAuth.ts
import { useEffect } from 'react';
import axios from 'axios';
import { useUser } from './userContext';



const useAuth = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios({
          url: "/auth/user",
          method: "GET",
          withCredentials: true,
        });
        const userData = response.data.user;
        setUser(userData);
      } catch (error) {
        console.error('Authentication check failed', error);
        // Handle error as needed
      }
    };

    checkAuth();
  }, [setUser]);

  return user;
};

export default useAuth;
