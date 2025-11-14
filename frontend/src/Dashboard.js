// code by kartik
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./Components/Navbar";
import { FaUserCircle, FaChartPie, FaEnvelope } from "react-icons/fa";

function Dashboard() {
    const navigate = useNavigate();

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
                {/* FillForm card */}
                <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center space-x-4 mb-4">
                        <FaUserCircle className="text-blue-500 text-3xl" />
                        <h2 className="text-xl font-semibold">Filled Forms</h2>
                    </div>
                    <p className="text-gray-600">Manage your Forms</p>
                </div>
                {/* Messages card */}
                <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center space-x-4 mb-4">
                        <FaEnvelope className="text-purple-500 text-3xl" />
                        <h2 className="text-xl font-semibold">Messages</h2>
                    </div>
                    <p className="text-gray-600">Check your notifications</p>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
