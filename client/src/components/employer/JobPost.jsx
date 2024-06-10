import React, { useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner'; // Import TailSpin or any other loader from the library

const JobPost = () => {
    const initialFormState = {
        title: '',
        description: '',
        skills: '',
        remote: false,
        flexibleSchedule: false,
    };

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false); // Add loading state

    const { title, description, skills, remote, flexibleSchedule } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onCheck = (e) => setFormData({ ...formData, [e.target.name]: e.target.checked });

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when form is submitted
        try {
            const res = await axios.post('http://localhost:5000/employers/jobs', formData);
            console.log(res.data);
            // Clear form after successful submission
            setFormData(initialFormState);
        } catch (err) {
            console.error(err.response.data);
        } finally {
            setLoading(false); // Set loading to false after submission
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Post a Job</h2>
            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={onChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                    <input
                        type="text"
                        name="skills"
                        value={skills}
                        onChange={onChange}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="remote"
                                checked={remote}
                                onChange={onCheck}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Remote</span>
                        </label>
                    </div>
                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="flexibleSchedule"
                                checked={flexibleSchedule}
                                onChange={onCheck}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Flexible Schedule</span>
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={loading} // Disable button when loading
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <TailSpin height="20" width="20" color="white" ariaLabel="loading" />
                            <span className="ml-2">Posting...</span>
                        </div>
                    ) : (
                        'Post Job'
                    )}
                </button>
            </form>
        </div>
    );
};

export default JobPost;
