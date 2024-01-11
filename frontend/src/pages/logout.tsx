// LogoutPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call your backend endpoint to clear the user's authentication status
            await axios.post('/auth/logout');
        } catch (error) {
            console.error('Logout failed', error);
            // Handle error as needed
        } finally {
            // Redirect to the login page after logging out
            navigate('/');
        }
    };

    return (
        <div>
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
