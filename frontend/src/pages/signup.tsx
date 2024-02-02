// SignupPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const signupUser = (formData: SignUpFormData) => {
    const response = axios({
        url: '/auth/signup', method: 'POST', withCredentials: true,
        data: formData
    })
    return response;
}

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignUpFormData>({
        name: '',
        email: '',
        password: '',
    });

    const signupMutation = useMutation({
        mutationFn:signupUser,
        onSuccess:()=>{
            navigate('/');
        },
        onError:()=>{
            console.log('Resgistration error');
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        signupMutation.mutate(formData);
    };

    return (
        <div>
            <h2>Signup Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;

