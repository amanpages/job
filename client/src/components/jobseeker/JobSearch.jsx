import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useError } from '../../context/ErrorContext';

const JobSearch = () => {
    const { auth } = useAuth();
    const { handleError } = useError();
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({
        remote: false,
        flexibleSchedule: false,
        search: '',
    });

    const { remote, flexibleSchedule, search } = filters;

    const onChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/jobseekers/jobs`, { params: filters });
                setJobs(res.data);
            } catch (err) {
                handleError(err.response.data.msg);
            }
        };
        fetchJobs();
    }, [filters, handleError]);

    const applyForJob = async (jobId) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/jobseekers/apply`, { jobId }, {
                headers: {
                    'x-auth-token': auth.token,
                }
            });

            console.log(res.data.msg);
            // Update the job status to 'Applied' in the UI
            setJobs((prevJobs) =>
                prevJobs.map((job) => (job._id === jobId ? { ...job, status: 'Applied' } : job))
            );

            // Store applied job in local storage
            localStorage.setItem(jobId, 'Applied');
        } catch (err) {
            handleError(err.response.data.msg);
        }
    };

    useEffect(() => {
        // Check local storage for applied jobs on component mount
        const appliedJobs = Object.keys(localStorage)
            .filter((key) => key !== 'authToken') // Exclude the authentication token from local storage
            .filter((key) => localStorage.getItem(key) === 'Applied');
        
        // Update job status for applied jobs from local storage
        setJobs((prevJobs) =>
            prevJobs.map((job) => (appliedJobs.includes(job._id) ? { ...job, status: 'Applied' } : job))
        );
    }, []);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Job Search</h2>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px' }}>
                    <span style={{ color: '#333' }}>Search</span>
                    <input
                        type="text"
                        name="search"
                        value={search}
                        onChange={onChange}
                        placeholder="Search jobs..."
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '5px' }}
                    />
                </label>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                        <input
                            type="checkbox"
                            name="remote"
                            checked={remote}
                            onChange={onChange}
                            style={{ marginRight: '5px' }}
                        />
                        Remote
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            name="flexibleSchedule"
                            checked={flexibleSchedule}
                            onChange={onChange}
                            style={{ marginRight: '5px' }}
                        />
                        Flexible Schedule
                    </label>
                </div>
            </div>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                {jobs.map((job) => (
                    <li key={job._id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '10px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{job.title}</h3>
                        <p style={{ marginBottom: '10px' }}>{job.description}</p>
                        <p style={{ marginBottom: '10px' }}><strong>Skills:</strong> {job.skills.join(', ')}</p>
                        <p style={{ marginBottom: '10px' }}><strong>Status:</strong> {job.status}</p>
                        {job.status !== 'Applied' && (
                            <button
                                onClick={() => applyForJob(job._id)}
                                style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Apply
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobSearch;
