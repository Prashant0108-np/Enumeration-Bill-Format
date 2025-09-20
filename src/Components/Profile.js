// Components/Profile.js
import React, { useState, useEffect } from "react";
import { AiOutlineUser, AiOutlineInfoCircle, AiOutlineSetting } from "react-icons/ai";
import { FaIdCard, FaUniversity } from "react-icons/fa";
import { auth, db } from "../firebase"; // 🔹 Firebase imports
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    gender: "Not specified",
  });

  const [additionalDetails, setAdditionalDetails] = useState({
    bankName: "",
    accountNumber: "",
    ifsc: "",
    mric: "",
    branchName: "",
  });

  // 🔹 Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return; // User not logged in

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          // 🔹 Set personal details
          setPersonalDetails({
            fullName: data.fullName || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            gender: data.gender || "Not specified",
          });

          // 🔹 Set additional details (if you store them)
          setAdditionalDetails({
            bankName: data.bankName || "",
            accountNumber: data.accountNumber || "",
            ifsc: data.ifsc || "",
            mric: data.mric || "",
            branchName: data.branchName || "",
          });
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[rgb(200,220,248)]">
      {/* Left Navbar */}
      <div className="w-64 bg-white shadow-lg p-5 flex flex-col space-y-6">
        <h2 className="text-xl text-center font-bold">Profile</h2>
        <button
          onClick={() => setActiveTab("personal")}
          className={`flex items-center space-x-2 p-2 rounded ${
            activeTab === "personal" ? "bg-indigo-200" : ""
          }`}
        >
          <AiOutlineUser size={20} />
          <span>Personal Information</span>
        </button>
        <button
          onClick={() => setActiveTab("additional")}
          className={`flex items-center space-x-2 p-2 rounded ${
            activeTab === "additional" ? "bg-indigo-200" : ""
          }`}
        >
          <AiOutlineInfoCircle size={20} />
          <span>Additional Information</span>
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center space-x-2 p-2 rounded ${
            activeTab === "settings" ? "bg-indigo-200" : ""
          }`}
        >
          <AiOutlineSetting size={20} />
          <span>Settings</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
            className="mx-auto rounded-full bg-white content-center font-semibold w-32 h-32 shadow-lg"
          />
          <h1 className="text-2xl font-bold mt-4">{personalDetails.fullName}</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl flex flex-col md:flex-row overflow-hidden transition-all duration-400 h-[600px]">
          {activeTab === "personal" && (
            <div className="bg-white p-6 rounded shadow space-y-3 overflow-y-auto scrollbar-hide">
              <p><strong>Email:</strong> {personalDetails.email}</p>
              <p><strong>Phone:</strong> {personalDetails.phone}</p>
              <p><strong>Address:</strong> {personalDetails.address}</p>
              <p><strong>Gender:</strong> {personalDetails.gender}</p>
            </div>
          )}

          {activeTab === "additional" && (
            <div className="bg-white p-6 rounded shadow space-y-3 overflow-y-auto scrollbar-hide">
              <p><FaUniversity className="inline mr-2" /> <strong>Bank Name:</strong> {additionalDetails.bankName}</p>
              <p><FaIdCard className="inline mr-2" /> <strong>Account Number:</strong> {additionalDetails.accountNumber}</p>
              <p><FaIdCard className="inline mr-2" /> <strong>IFSC Code:</strong> {additionalDetails.ifsc}</p>
              <p><FaIdCard className="inline mr-2" /> <strong>MRIC Code:</strong> {additionalDetails.mric}</p>
              <p><FaUniversity className="inline mr-2" /> <strong>Branch Name:</strong> {additionalDetails.branchName}</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white p-6 rounded shadow space-y-3">
              <p>Edit Profile (Coming soon)</p>
              <p>Change Password (Coming soon)</p>
              <p>Delete Account (Coming soon)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
