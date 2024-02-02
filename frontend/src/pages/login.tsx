// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../hooks/userContext';
import { useMutation ,useQueryClient} from '@tanstack/react-query';

const loginUser = ({ email, password }: { email: string, password: string }) => {
  const response = axios.post('/auth/password', { email, password }, { withCredentials: true })
    .then((data) => {
      return data.data;
    }).then((data) => {
      return data.user;
    });

  return response;

}

const Login: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess:(data) => {
      queryClient.setQueryData(['user'],data);
      navigate('/');
    },

    onError:() => {
      console.log('login error');
    }
  })

  const handleLogin = async () => {
    const user = loginMutation.mutate({ email, password });
  }

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
