import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function Dashboard() {
    const navigate = useNavigate();

    // Handles user Logout by signing out from Firebase authentication 
    // and redirecting the user back to the Logein page
    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar />

            {/* Content */}
            <main className="flex-1 p-10 m-9 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Example Card */}
                <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
                    <h2 className="text-lg font-semibold mb-2">Profile</h2>
                    <p className="text-gray-600">User details & settings</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
                    <h2 className="text-lg font-semibold mb-2">Analytics</h2>
                    <p className="text-gray-600">Some charts and stats</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
                    <h2 className="text-lg font-semibold mb-2">Messages</h2>
                    <p className="text-gray-600">Your latest notifications</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Dashboard;