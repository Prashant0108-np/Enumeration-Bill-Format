// code by prashant
import React, { useState } from "react";
import { auth, db } from "./firebase";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    fetchSignInMethodsForEmail,
} from "firebase/auth";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { showToast } from "./utils/toast";

// Login component handles user authentication using Email/Password and Google Sign-In.
// It also provides real-time password validation feedback.
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const navigate = useNavigate();

    // Handles login using Email & Password
    const fetchUserRecord = async (user) => {
        // fetch user document and return its data (or null)
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                return userSnap.data();
            } else {
                return null;
            }
        } catch (err) {
            console.error("Failed to load user record:", err);
            return null;
        }
    };

    const handleSubmit = async () => {
        setError("");
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email.trim().toLowerCase(),
                password
            );

            const user = userCredential.user;
            const userData = await fetchUserRecord(user);

            if (!userData) {
                // No Firestore record yet — require profile completion
                navigate("/complete-profile");
                return;
            }

            if (userData.role === "admin") {
                // ensure profile fields exist before giving access
                const missing = !userData.fullName || !userData.phone || !userData.address || !userData.bankName || !userData.role;
                if (missing) {
                  navigate("/complete-profile");
                  return;
                }
                showToast("Welcome, Admin!", "success");
                navigate("/admin");
                return;
            }

            // If role is 'user', prefetch forms and pass them to dashboard
            if (userData.role === "user") {
                // ensure profile fields exist before giving access
                const missing = !userData.fullName || !userData.phone || !userData.address || !userData.bankName || !userData.role;
                if (missing) {
                  navigate("/complete-profile");
                  return;
                }
                try {
                    const idToken = await user.getIdToken();
                    // idToken length debug removed
                    const res = await axios.get("http://127.0.0.1:8000/api/exam-bill/user/", {
                        headers: { Authorization: `Bearer ${idToken}` },
                    });
                    const initialForms = Array.isArray(res.data) ? res.data : [];
                    showToast("Welcome, User!", "success");
                    navigate("/dashboard", { state: { initialForms } });
                } catch (err) {
                    console.error("Error prefetching forms:", err);
                    // if server rejected because token used too early, try refreshing token once and retry
                    const serverMsg = err?.response?.data?.error || err?.message || '';
                    if (typeof serverMsg === 'string' && serverMsg.includes('Token used too early')) {
                        try {
                            // Token used too early — retrying after 1s with refreshed token
                            await new Promise((r) => setTimeout(r, 1000));
                            const idToken2 = await user.getIdToken(true); // force refresh
                            const res2 = await axios.get("http://127.0.0.1:8000/api/exam-bill/user/", {
                                headers: { Authorization: `Bearer ${idToken2}` },
                            });
                            const initialForms = Array.isArray(res2.data) ? res2.data : [];
                            showToast("Welcome, User!", "success");
                            navigate("/dashboard", { state: { initialForms } });
                            return;
                        } catch (err2) {
                            console.error('Retry failed:', err2);
                        }
                    }
                    // fallback to normal navigation if prefetch fails
                    navigate("/dashboard");
                }
                return;
            }

            showToast("Unknown role. Please contact support.", "error");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setError("This email is not registered. Please register first.");
            } else if (error.code === "auth/wrong-password") {
                setError("Wrong Password");
            } else {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // Handles login using Google OAuth popup
    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userData = await fetchUserRecord(user);

            if (!userData) {
                // No Firestore record — require profile completion
                navigate("/complete-profile");
                return;
            }

            if (userData.role === "admin") {
                const missing = !userData.fullName || !userData.phone || !userData.address || !userData.bankName || !userData.role;
                if (missing) {
                  navigate("/complete-profile");
                  return;
                }
                showToast("Welcome, Admin!", "success");
                navigate("/admin");
                return;
            }

            if (userData.role === "user") {
                const missing = !userData.fullName || !userData.phone || !userData.address || !userData.bankName || !userData.role;
                if (missing) {
                  navigate("/complete-profile");
                  return;
                }
                try {
                    const idToken = await user.getIdToken();
                    const res = await axios.get("http://127.0.0.1:8000/api/exam-bill/user/", {
                        headers: { Authorization: `Bearer ${idToken}` },
                    });
                    const initialForms = Array.isArray(res.data) ? res.data : [];
                    showToast("Welcome, User!", "success");
                    navigate("/dashboard", { state: { initialForms } });
                } catch (err) {
                    console.error("Error prefetching forms:", err);
                    navigate("/dashboard");
                }
                return;
            }

            showToast("Unknown role. Please contact support.", "error");
        } catch (error) {
            console.error("Google login failed:", error);
            setError(error.message || "Google sign-in failed");
        } finally {
            setLoading(false);
        }
    };

    // Tracks password input and updates validation states
    const handlePasswordChange = (pass) => {
        setPassword(pass);
        setPasswordValidations({
            length: pass.length >= 8,
            uppercase: /[A-Z]/.test(pass),
            lowercase: /[a-z]/.test(pass),
            number: /\d/.test(pass),
            specialChar: /[@$!%*?&]/.test(pass),
        });
    };

    const emailFilled = email.length > 0;
    const passwordFilled = password.length > 0;

    return (
        <div className="flex justify-center items-center min-h-screen bg-[rgb(165,197,242)] p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden transition-all duration-500 h-[600px]">
                
                {/* Left: Form */}
                <div className="w-full md:w-1/2 p-8 relative overflow-y-auto scrollbar-hide">
                    <p
                        onClick={() => navigate("/register")}
                        className="absolute top-4 right-6 text-sm text-indigo-600 cursor-pointer hover:underline transition"
                    >
                        New user? Register here
                    </p>

                    <h2 className="text-3xl font-bold text-indigo-700 text-center mt-4">
                        Login
                    </h2>
                    <p className="text-center text-gray-500 text-sm mb-6">
                        Secure your communications with easy mail
                    </p>

                    {/* Email Field */}
                    <div className="relative mb-4">
                        <AiOutlineMail
                            className="absolute left-3 inset-y-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className={`w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 pr-10 transition duration-300 ease-in-out
                            ${emailFilled ? "border-green-500 focus:ring-green-400" : "border-gray-300 focus:ring-indigo-400"}`}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative mb-2">
                        <RiLockPasswordLine
                            className="absolute left-3 inset-y-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className={`w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 pr-10 transition duration-300 ease-in-out
                            ${passwordFilled ? "border-green-500 focus:ring-green-400" : "border-gray-300 focus:ring-indigo-400"}`}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                        />

                        {/* Toggle password visibility */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 inset-y-1/2 pb-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Buttons */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`w-full py-3 mb-3 mt-7 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition transform ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Signing in...' : 'Login'}
                    </button>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className={`w-full flex items-center justify-center py-3 bg-pink-400 hover:bg-pink-500 hover:scale-105 text-white rounded-xl font-medium transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5 mr-2"
                        />
                        {loading ? 'Signing in...' : 'Sign in with Google'}
                    </button>
                </div>

                {/* Right: Image */}
                <div className="hidden md:flex w-1/2 bg-white justify-center items-center overflow-hidden">
                    <img
                        src={process.env.PUBLIC_URL + "/LoginImage.png.jpg"}
                        alt="Illustration"
                        className="max-w-full max-h-full rounded-2xl transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
