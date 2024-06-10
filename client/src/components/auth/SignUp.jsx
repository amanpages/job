// client/src/components/auth/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'jobseeker',
        skills: '',
    });

    const { email, password, role, skills } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, formData);
            toast.success('Sign up successful. Please log in.');
            navigate('/login');
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-md p-10 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-white">Sign Up</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white">Email</label>
                        <input type="email" name="email" value={email} onChange={onChange} required className="input" />
                    </div>
                    <div>
                        <label className="block text-white">Password</label>
                        <input type="password" name="password" value={password} onChange={onChange} required className="input" />
                    </div>
                    <div>
                        <label className="block text-white">Role</label>
                        <select name="role" value={role} onChange={onChange} className="input">
                            <option value="jobseeker">Job Seeker</option>
                            <option value="employer">Employer</option>
                        </select>
                    </div>
                    {role === 'jobseeker' && (
                        <div>
                            <label className="block text-white">Skills (comma separated)</label>
                            <input type="text" name="skills" value={skills} onChange={onChange} className="input" />
                        </div>
                    )}
                    <button type="submit" className="btn w-full">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
