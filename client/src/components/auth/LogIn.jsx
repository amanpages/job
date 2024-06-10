import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const LogIn = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        if (!email.trim() || !password.trim()) {
            toast.error('Please enter both email and password');
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await login(formData);
            if (res.error) {
                toast.error(res.error.msg);
                console.error('Login error:', res.error);
            } else {
                toast.success('Login successful');
                const redirectPath = res.user.role === 'jobseeker' ? '/jobseeker-home' : res.user.role === 'employer' ? '/employer-home' : '/admin';
                navigate(redirectPath);
            }
        } catch (err) {
            const errorMessage = err.response ? err.response.data.msg : 'Login failed';
            toast.error(errorMessage);
            console.error('Login error:', err.response ? err.response.data : err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-md p-10 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-white">Log In</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white">Email</label>
                        <input type="email" name="email" value={email} onChange={onChange} required className="input" />
                    </div>
                    <div>
                        <label className="block text-white">Password</label>
                        <input type="password" name="password" value={password} onChange={onChange} required className="input" />
                    </div>
                    <button type="submit" className="btn w-full" disabled={isSubmitting}>Log In</button>
                </form>
            </div>
        </div>
    );
};

export default LogIn;
