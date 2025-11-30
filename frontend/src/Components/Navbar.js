// src/components/Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();

    // REF for dropdown
    const dropdownRef = useRef(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Auth listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-500 to-blue-600 shadow-md z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

                {/* Left - Dashboard */}
                <h1
                    className="text-white text-3xl font-bold cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </h1>

                {/* Center - Desktop Links */}
                <ul className="hidden md:flex space-x-8 text-white font-medium">
                    <li
                        className="relative cursor-pointer hover:text-yellow-300 transition"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        ref={dropdownRef}
                    >
                        Create Form ▼

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.ul
                                    initial={{ opacity: 0, y: -15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg"
                                >
                                    <li
                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() =>
                                            navigate("/fill-form", { state: { prefill: true } })
                                        }
                                    >
                                        For Myself
                                    </li>

                                    <li
                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() =>
                                            navigate("/fill-form", { state: { prefill: false } })
                                        }
                                    >
                                        For Other
                                    </li>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </li>
                </ul>

                {/* Right - Logout Button */}
                <div className="hidden md:block">
                    {user && (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
