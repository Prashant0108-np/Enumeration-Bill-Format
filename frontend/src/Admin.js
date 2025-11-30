import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

export default function AdminPanel() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      const querySnapshot = await getDocs(collection(db, "examBills"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setForms(data);
    };
    fetchForms();
  }, []);

  const handleOpenForm = (formData) => {
    navigate("/admin-view-form", { state: { prefillData: formData, prefill: true } });
  };

  const handleLogout = async () => {
          try {
              await signOut(auth);
              navigate("/");
          } catch (error) {
              console.error("Logout Error:", error);
          }
      };

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* Header */}
      <div className="bg-blue-500 h-20 flex items-center justify-between px-6 relative">
        
        {/* Left - Dashboard */}
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>

        {/* Center - Admin Panel */}
        <h1 className="text-3xl font-bold text-black absolute left-1/2 transform -translate-x-1/2">
          Admin Panel
        </h1>

        {/* Right - Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Forms Grid */}
      <div className="grid p-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {forms.map((form) => (
          <div
            key={form.id}
            onClick={() => handleOpenForm(form)}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {form.examinerName || "No Name"}
            </h2>
            <p className="text-gray-600 mt-1">C.No: {form.cno || "Not Provided"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
