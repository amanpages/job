import React from 'react';

const JobSeekerHome = () => {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Job Seeker Home</h2>
            <p className="mb-4">Welcome to the job seeker dashboard. Here you can search for jobs and manage your profile.</p>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Your Skills</h3>
                <p className="text-gray-700">Your skills will be displayed here.</p>
            </div>
        </div>
    );
};

export default JobSeekerHome;
