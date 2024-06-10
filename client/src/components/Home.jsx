// client/src/components/Home.js
import React from 'react';

const Home = () => {
    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/path/to/your/background-image.jpg)' }}>
            <div className="bg-zinc-900 bg-opacity-20 backdrop-blur-md p-10 rounded-lg shadow-lg max-w-lg text-center">
                <h1 className="text-5xl font-bold text-white mb-4">Welcome to JobConnect</h1>
                <p className="text-white text-lg mb-8">Connecting talented individuals with businesses seeking skilled employees.</p>
                <div className="flex justify-center space-x-4">
                    <a href="/login" className="btn">Login</a>
                    <a href="/signup" className="btn">Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default Home;
