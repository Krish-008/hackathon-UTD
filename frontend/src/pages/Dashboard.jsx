import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        QuestMap Dashboard
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        Logout
                    </button>
                </header>

                <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
                    <h2 className="text-xl mb-4">Welcome, {user?.displayName || 'Adventurer'}!</h2>
                    <p className="text-gray-400 mb-6">
                        Your learning journey is just beginning. Soon you will see your knowledge maps here.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="aspect-video bg-gray-900/50 rounded-xl border border-gray-700 flex items-center justify-center text-gray-500 italic">
                                Quest {i} Placeholder
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
