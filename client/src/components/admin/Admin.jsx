import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/admin/users');
                setUsers(res.data);
            } catch (err) {
                console.error(err.response?.data || 'Error fetching users');
            }
        };

        const fetchJobs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/admin/jobs');
                setJobs(res.data);
            } catch (err) {
                console.error(err.response?.data || 'Error fetching jobs');
            }
        };

        fetchUsers();
        fetchJobs();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-md shadow-md">
                    <h3 className="text-xl font-bold mb-4">Users</h3>
                    <ul className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <li key={user._id} className="py-2">
                                {user.username} - {user.role}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-md shadow-md">
                    <h3 className="text-xl font-bold mb-4">Jobs</h3>
                    <ul className="divide-y divide-gray-200">
                        {jobs.map((job) => (
                            <li key={job._id} className="py-2">
                                {job.title} - {job.description}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Admin;
