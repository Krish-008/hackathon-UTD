import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Loader2, Zap } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    // AI Test State
    const [topic, setTopic] = useState('');
    const [level, setLevel] = useState('beginner');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    const generateMap = async () => {
        if (!topic) return alert("Please enter a topic");

        setLoading(true);
        setResult(null);
        setError('');

        try {
            // Note: Now using relative path so Vercel & Vite Proxy can handle it
            const response = await fetch('/api/generate-map', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, skill_level: level })
            });

            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            QuestMap Dashboard
                        </h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors text-sm font-medium"
                    >
                        Logout
                    </button>
                </header>

                {/* AI TEST SECTION */}
                <section className="mb-12 bg-gray-800/50 rounded-2xl p-6 border border-blue-500/30 shadow-lg shadow-blue-500/5">
                    <div className="flex items-center gap-2 mb-6">
                        <Zap className="w-5 h-5 text-blue-400" />
                        <h2 className="text-xl font-semibold">Gemini AI Verification</h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="e.g. Machine Learning"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                        <button
                            onClick={generateMap}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate Map'}
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-4 text-sm font-mono">
                            Error: {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm text-gray-500 font-mono uppercase tracking-wider">Raw Response (JSON)</label>
                        <textarea
                            readOnly
                            value={result ? JSON.stringify(result, null, 2) : error ? "Error occurred..." : "Response will appear here..."}
                            placeholder="Result will appear here..."
                            className="w-full h-64 bg-gray-950 border border-gray-700 rounded-xl p-4 font-mono text-sm text-blue-300 outline-none scrollbar-thin overflow-auto"
                        />
                    </div>
                </section>

                {/* Existing Content */}
                <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                    <h2 className="text-xl font-semibold mb-2">Welcome, {user?.displayName || 'Adventurer'}!</h2>
                    <p className="text-gray-400 mb-8">
                        Your quests and knowledge maps will appear below after generation.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="aspect-video bg-gray-900/50 rounded-xl border border-gray-700 border-dashed flex items-center justify-center text-gray-600">
                            No active maps yet.
                        </div>
                        <div className="aspect-video bg-gray-900/50 rounded-xl border border-gray-700 border-dashed flex items-center justify-center text-gray-600">
                            Empty Quest Slot
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
