// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { ErrorProvider } from './context/ErrorContext';
import { NotificationProvider } from './context/NotificationContext';
import ErrorMessage from './components/ErrorMessage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import JobSearch from './components/jobseeker/JobSearch';
import JobPost from './components/employer/JobPost';
import CandidateSearch from './components/employer/CandidateSearch';
import Admin from './components/admin/Admin';
import Notifications from './components/Notifications';
import JobSeekerHome from './components/jobseeker/JobSeekerHome';
import EmployerHome from './components/employer/EmployerHome';
import Home from './components/Home';

function App() {
    return (
        <AuthProvider>
            <ErrorProvider>
                <NotificationProvider>
                    <Router>
                        <Navbar />
                        <ErrorMessage />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<LogIn />} />
                            <Route path="/jobsearch" element={<ProtectedRoute element={JobSearch} roles={['jobseeker']} />} />
                            <Route path="/jobpost" element={<ProtectedRoute element={JobPost} roles={['employer']} />} />
                            <Route path="/candidatesearch" element={<ProtectedRoute element={CandidateSearch} roles={['employer']} />} />
                            <Route path="/admin" element={<ProtectedRoute element={Admin} roles={['admin']} />} />
                            <Route path="/notifications" element={<ProtectedRoute element={Notifications} roles={['employer', 'admin']} />} />
                            <Route path="/jobseeker-home" element={<ProtectedRoute element={JobSeekerHome} roles={['jobseeker']} />} />
                            <Route path="/employer-home" element={<ProtectedRoute element={EmployerHome} roles={['employer']} />} />
                            <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
                        </Routes>
                        <ToastContainer />
                    </Router>
                </NotificationProvider>
            </ErrorProvider>
        </AuthProvider>
    );
}

export default App;
