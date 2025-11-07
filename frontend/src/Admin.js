import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Panel</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
