// code by kartik
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./Components/Navbar";
import { useFetchUserForms } from "./hooks/useDashboard";

import { FaUserCircle } from "react-icons/fa";
import { MessagesCard } from "./Components/MessagesCard";

function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialForms = location?.state?.initialForms ?? null;
    const { forms, loading } = useFetchUserForms(initialForms);

    React.useEffect(() => {
        // Dashboard mounted with initial forms
    }, []);

    React.useEffect(() => {
        // Forms updated
    }, [forms, loading]);

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

            {/* Main Grid */}
            <main className="flex-1 p-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Filled Forms card */}
                <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center space-x-4 mb-4">
                        <FaUserCircle className="text-blue-500 text-3xl" />
                        <h2 className="text-xl font-semibold">Filled Forms</h2>
                    </div>

                    <p className="text-gray-600 mb-4">Manage your Forms</p>

                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <p className="ml-2 text-gray-600">Loading forms...</p>
                        </div>
                    ) : !Array.isArray(forms) || forms.length === 0 ? (
                        <p className="text-gray-500">No forms submitted yet.</p>
                    ) : (
                        <ul className="space-y-2">
                            {forms.map((form) => (
                                <li
                                    key={form.id}
                                    className="border rounded p-3 flex justify-between items-center hover:bg-gray-50 transition"
                                >
                                    <span className="text-sm">
                                        <strong>{form.examinerName}</strong> — {form.examType} ({form.cno})
                                    </span>
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                                        onClick={() =>
                                            navigate("/fill-form", {
                                                state: { prefill: true, prefillData: form },
                                            })
                                        }
                                    >
                                        View
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Messages card */}
                <MessagesCard forms={forms} loading={loading} />

            </main>
        </div>
    );
}

export default Dashboard;
