// client/src/components/employer/CandidateSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner'; // Import TailSpin or any other loader from the library

const CandidateSearch = () => {
    const [candidates, setCandidates] = useState([]);
    const [skills, setSkills] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const onChange = (e) => setSkills(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when search is initiated
        try {
            const res = await axios.get('http://localhost:5000/employers/candidates', { params: { skills } });
            setCandidates(res.data);
        } catch (err) {
            console.error(err.response?.data || err.message);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Search Candidates</h2>
            <form onSubmit={onSubmit} className="mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                    <input
                        type="text"
                        name="skills"
                        value={skills}
                        onChange={onChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={loading} // Disable button when loading
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <TailSpin height="20" width="20" color="white" ariaLabel="loading" />
                            <span className="ml-2">Searching...</span>
                        </div>
                    ) : (
                        'Search'
                    )}
                </button>
            </form>
            <ul className="space-y-4">
                {candidates.map((candidate) => (
                    <li key={candidate._id} className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-xl font-semibold">{candidate.username}</h3>
                        <p className="text-gray-700">Skills: {candidate.profile.skills.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CandidateSearch;
