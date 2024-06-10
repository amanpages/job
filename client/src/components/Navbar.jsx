import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Notifications from './Notifications';

const Navbar = () => {
    const navigate = useNavigate();
    const { auth, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {auth.isAuthenticated ? (
                    <Link
                        to={
                            auth.user.role === 'jobseeker'
                                ? '/jobseeker-home'
                                : auth.user.role === 'employer'
                                ? '/employer-home'
                                : auth.user.role === 'admin'
                                ? '/admin'
                                : '/'
                        }
                        className="text-2xl font-bold"
                    >
                        JobConnect
                    </Link>
                ) : (
                    <Link to="/" className="text-2xl font-bold">
                        JobConnect
                    </Link>
                )}
                <div className="flex items-center space-x-4">
                    {auth.isAuthenticated && <Notifications />}
                    {!auth.isAuthenticated ? (
                        <>
                            <Link to="/login" className="mr-4">
                                Login
                            </Link>
                            <Link to="/signup" className="mr-4">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            {auth.user.role === 'jobseeker' && (
                                <Link to="/jobsearch" className="mr-4">
                                    Job Search
                                </Link>
                            )}
                            {auth.user.role === 'employer' && (
                                <>
                                    <Link to="/jobpost" className="mr-4">
                                        Post Job
                                    </Link>
                                    <Link to="/candidatesearch" className="mr-4">
                                        Candidate Search
                                    </Link>
                                </>
                            )}
                            {auth.user.role === 'admin' && (
                                <Link to="/admin" className="mr-4">
                                    Admin
                                </Link>
                            )}
                            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
