// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/"); // logout hone ke baad login page pe bhej do
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-500 to-blue-600 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Left - Logo */}
                <h1
                    className="text-white text-2xl font-bold cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </h1>

                {/* Center - Navigation Links */}
                <ul className="hidden md:flex space-x-8 text-white font-medium">
                    <li
                        className="cursor-pointer hover:text-yellow-300 transition"
                        onClick={() => navigate("/dashboard")}
                    >
                        Home
                    </li>
                    <li
                        className="cursor-pointer hover:text-yellow-300 transition"
                        onClick={() => navigate("/created-forms")}
                    >
                        Created Form
                    </li>
                    <li
                        className="cursor-pointer hover:text-yellow-300 transition"
                        onClick={() => navigate("/NewForm")}
                    >
                        Create New Form
                    </li>
                </ul>

                {/* Right - User Dropdown */}
                <div className="relative">
                    {user ? (
                        <>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="text-white font-semibold bg-green-400 px-4 py-2 rounded-full hover:bg-green-600 transition"
                            >
                                {user.displayName || user.email}
                            </button>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden"
                                    >
                                        <p
                                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => navigate("/profile")}
                                        >
                                            Profile
                                        </p>
                                        <p
                                            className="px-4 py-2 bg-red-500 text-black hover:bg-red-600 cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    ) : (
                        <button
                            onClick={() => navigate("/")}
                            className="text-white font-semibold bg-indigo-700 px-4 py-2 rounded-full hover:bg-indigo-800 transition"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
