// code by kartik
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { FaUserCircle, FaChartPie, FaEnvelope } from "react-icons/fa";

function Dashboard() {
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const idToken = await user.getIdToken();
                const res = await axios.get("http://127.0.0.1:8000/api/exam-bill/user/", {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                });
                setForms(res.data);
            } catch (err) {
                console.error("Error fetching forms:", err);
                setForms([]);
            } finally {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);


    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            {/* Header Section */}
            <header className="flex justify-between items-center px-10 py-6 bg-white shadow">
                <h1 className="text-2xl font-bold text-gray-800">
                    Welcome Back 👋
                </h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl shadow hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </header>
            <main className="flex-1 p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Filled Forms card */}
                <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center space-x-4 mb-4">
                        <FaUserCircle className="text-blue-500 text-3xl" />
                        <h2 className="text-xl font-semibold">Filled Forms</h2>
                    </div>
                    <p className="text-gray-600 mb-4">Manage your Forms</p>
                    {loading ? (
                        <p>Loading...</p>
                    ) : !Array.isArray(forms) || forms.length === 0 ? (
                        <p>No forms submitted yet.</p>
                    ) : (
                        <ul className="space-y-2">
                            {forms.map((form) => (
                                <li key={form.id} className="border rounded p-2 flex justify-between items-center">
                                    <span>
                                        {form.examinerName} — {form.examType} ({form.cno})
                                    </span>
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                        onClick={() => navigate("/fill-form", { state: { prefill: true, prefillData: form } })}
                                    >
                                        View
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* Messages card */}
                <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center space-x-4 mb-4">
                        <FaEnvelope className="text-purple-500 text-3xl" />
                        <h2 className="text-xl font-semibold">Messages</h2>
                    </div>
                    <p className="text-gray-600 mb-2">Check your notifications</p>
                    {forms.filter(f => f.remark).length === 0 ? (
                        <p>No remarks from admin yet.</p>
                    ) : (
                        <ul className="space-y-2">
                            {forms.filter(f => f.remark).map((form) => (
                                <li key={form.id} className="border rounded p-2">
                                    <strong>Remark for {form.examinerName} ({form.cno}):</strong>
                                    <br />
                                    {form.remark}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
