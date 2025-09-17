import React, { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bankName, setBankName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const navigate = useNavigate();

  // 🔹 Input validation
  const validateInput = (field, value) => {
    let newErrors = { ...errors };

    if (field === "fullName" || field === "bankName") {
      if (/[^a-zA-Z\s]/.test(value)) {
        newErrors[field] = "Enter alphabetical value only";
      } else {
        delete newErrors[field];
      }
    }

    if (field === "phone") {
      if (/[^0-9]/.test(value)) {
        newErrors[field] = "Enter numerical value only";
      } else {
        delete newErrors[field];
      }
    }

    setErrors(newErrors);
  };

  // 🔹 Phone number restriction (max 10 digits)
  const handlePhoneChange = (value) => {
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
      validateInput("phone", value);
    }
  };

  // 🔹 Bank name restriction (alphabet only)
  const handleBankNameChange = (value) => {
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setBankName(value);
      validateInput("bankName", value);
    }
  };

  // 🔹 Password validation live check
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

  // 🔹 Register submit
  const handleSubmit = async () => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        alert("This email is already registered.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
      navigate("/"); // 🔹 Redirect to login page
    } catch (error) {
      alert(error.message);
    }
  };

  // 🔹 Google Register (autofill data)
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔹 Autofill form data if available
      if (user.displayName) setFullName(user.displayName);
      if (user.email) setEmail(user.email);

      alert("Google login successful! Data auto-filled.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[rgb(165,197,242)] p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden transition-all duration-500 h-[600px]">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8 relative overflow-y-auto scrollbar-hide">
          <p
            onClick={() => navigate("/")}
            className="absolute top-4 right-6 text-sm text-indigo-600 cursor-pointer hover:underline transition"
          >
            Already registered? Login here
          </p>

          <h2 className="text-3xl font-bold text-indigo-700 text-center mt-4">
            Register
          </h2>

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mt-6 mb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              validateInput("fullName", e.target.value);
            }}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 mb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            className="w-full p-3 mb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* Bank Name */}
          <input
            type="text"
            placeholder="Bank Name"
            className="w-full p-3 mb-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={bankName}
            onChange={(e) => handleBankNameChange(e.target.value)}
          />
          {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}

          {/* Email */}
          <div className="relative mb-4">
            <AiOutlineMail className="absolute left-3 inset-y-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative mb-2">
            <RiLockPasswordLine className="absolute left-3 inset-y-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 pb-4 inset-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-2">
            <RiLockPasswordLine className="absolute left-3 inset-y-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 pb-4 inset-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-sm mb-2">Password mismatch</p>
          )}

          {/* Password validations */}
          <div className="mb-4 text-sm">
            {Object.entries(passwordValidations).map(([key, valid]) => (
              <p key={key} className={valid ? "text-green-500" : "text-red-500"}>
                • {key === "length" && "At least 8 characters"}
                {key === "uppercase" && "One uppercase letter"}
                {key === "lowercase" && "One lowercase letter"}
                {key === "number" && "One number"}
                {key === "specialChar" && "One special character (@$!%*?&)"}
              </p>
            ))}
          </div>

          {/* Buttons */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition transform"
          >
            Register
          </button>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-3 bg-pink-400 hover:bg-pink-500 hover:scale-105 text-white rounded-xl font-medium transition mt-2"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Register with Google
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
export default Register;
