// code by kartik
// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    //This is for Profile Login and Logout dropDown
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [menuOpen1, setMenuOpen1] = useState(false);

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
            navigate("/");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-500 to-blue-600 shadow-md z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Left - Logo */}
                <h1
                    className="text-white text-2xl font-bold cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </h1>

                {/* Center - Links (Desktop) */}
                <ul className="hidden md:flex space-x-8 text-white font-medium">
                    <li
                        className="cursor-pointer hover:text-yellow-300 transition"
                        onClick={() => navigate("/dashboard")}
                    >
                        Home
                    </li>
<li
  className="relative cursor-pointer hover:text-yellow-300 transition"
  onClick={() => setDropdownOpen(!dropdownOpen)}
>
  Create Form ▼
  {/* Dropdown */}
  {dropdownOpen && (
    <ul className="absolute left-0 -top--25 w-40 bg-white text-black rounded shadow-lg">
  <li
    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
    onClick={() => navigate("/fill-form", { state: { prefill: true } })}
  >
    For Myself
  </li>

  <li
    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
    onClick={() => navigate("/fill-form", { state: { prefill: false } })}
  >
    For Other
  </li>
</ul>

  )}
</li>

                </ul>

                {/* Right - User / Login */}
                <div className="relative hidden md:block">
                    {user ? (
                        <>
                            <button
                                onClick={() => setDropdownOpen1(!dropdownOpen1)}
                                className="w-10 h-10 rounded-full bg-green-400 text-white flex items-center justify-center font-bold hover:bg-green-500 transition"
                            >
                                {user.displayName
                                    ? user.displayName.charAt(0).toUpperCase()
                                    : "U"}
                            </button>

                            {/* <AnimatePresence> */}
                            {dropdownOpen1 && (
                                <div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg overflow-hidden"
                                >
                                    <p
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => navigate("/profile")}
                                    >
                                        Profile
                                    </p>
                                    <p
                                        className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </p>
                                </div>
                            )}
                            {/* </AnimatePresence> */}
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

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setMenuOpen1(!menuOpen1)}
                >
                    {menuOpen1 ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen1 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-indigo-600 text-white font-medium space-y-4 px-6 py-6"
                    >
                        <p
                            className="cursor-pointer hover:text-yellow-300"
                            onClick={() => {
                                navigate("/dashboard");
                                setMenuOpen1(false);
                            }}
                        >
                            Home
                        </p>
                        <p
                            className="cursor-pointer hover:text-yellow-300"
                            onClick={() => {
                                navigate("/created-forms");
                                setMenuOpen1(false);
                            }}
                        >
                            Created Forms
                        </p>
                        <p
                            className="cursor-pointer hover:text-yellow-300"
                            onClick={() => {
                                navigate("/fill-form");
                                setMenuOpen1(false);
                            }}
                        >
                            Create forms
                        </p>
                        <p
                            className="cursor-pointer hover:text-yellow-300"
                            onClick={() => {
                                navigate("/about");
                                setMenuOpen1(false);
                            }}
                        >
                            About
                        </p>

                        {user ? (
                            <p
                                className="cursor-pointer bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
                                onClick={handleLogout}
                            >
                                Logout
                            </p>
                        ) : (
                            <p
                                className="cursor-pointer bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-800"
                                onClick={() => navigate("/")}
                            >
                                Login
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
