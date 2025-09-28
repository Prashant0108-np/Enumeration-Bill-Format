// code by prashant
import React, { useState } from "react";
import { auth } from "./firebase";
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


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
            alert("Login Successful!");
            navigate("/dashboard");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setError("This email is not registered. Please register first.");
            } else if (error.code === "auth/wrong-password") {
                alert("Wrong Password");
            } else {
                setError(error.message);
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            alert("Google login successful!");
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        }
    };

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
                ${emailFilled
                                    ? "border-green-500 focus:ring-green-400"
                                    : "border-gray-300 focus:ring-indigo-400"
                                }`}
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
                ${passwordFilled
                                    ? "border-green-500 focus:ring-green-400"
                                    : "border-gray-300 focus:ring-indigo-400"
                                }`}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 inset-y-1/2 pb-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Password validations - always visible */}
                    {/* <div className="mb-4 text-sm">
                        <p
                            className={
                                passwordValidations.length ? "text-green-500" : "text-red-500"
                            }
                        >
                            • At least 8 characters
                        </p>
                        <p
                            className={
                                passwordValidations.uppercase ? "text-green-500" : "text-red-500"
                            }
                        >
                            • One uppercase letter
                        </p>
                        <p
                            className={
                                passwordValidations.lowercase ? "text-green-500" : "text-red-500"
                            }
                        >
                            • One lowercase letter
                        </p>
                        <p
                            className={
                                passwordValidations.number ? "text-green-500" : "text-red-500"
                            }
                        >
                            • One number
                        </p>
                        <p
                            className={
                                passwordValidations.specialChar
                                    ? "text-green-500"
                                    : "text-red-500"
                            }
                        >
                            • One special character (@$!%*?&)
                        </p>
                    </div> */}

                    {/* {error && <p className="text-red-500 text-sm mb-2">{error}</p>} */}

                    {/* Buttons */}
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 mb-3 mt-7 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition transform"
                    >
                        Login
                    </button>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center py-3 bg-pink-400 hover:bg-pink-500 hover:scale-105 text-white rounded-xl font-medium transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5 mr-2"
                        />
                        Sign in with Google
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
