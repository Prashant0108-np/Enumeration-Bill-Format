// code by Harsh

import { useState, useEffect } from "react";
import axios from "axios";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "./firebase";
import { useLocation, useNavigate } from "react-router-dom";
import SharedForm from "./Components/SharedForm";
import { usePdfGeneration } from "./hooks/usePdfGeneration";
import { useFormSubmission } from "./hooks/useFormSubmission";
import { showToast } from "./utils/toast";

export default function ExamBillForm() {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const { generatePdf } = usePdfGeneration();
  const { submitForm, updateForm } = useFormSubmission();

  const location = useLocation();
  const navigate = useNavigate();
  const shouldPrefill = location.state?.prefill;
  const prefillData = location.state?.prefillData;

  // Fetch user data or prefill if available
  useEffect(() => {
    const fetchFormData = async () => {
      // ✅ Case 1: Parent component passed prefillData
      if (prefillData) {
        setFormData(prefillData);
        return;
      }

      // ✅ Case 2: Prefill user Firestore data
      if (!shouldPrefill) return;

      const user = auth.currentUser;
      if (!user) return;
      const idToken = await user.getIdToken();

      try {
        const res = await axios.get("http://127.0.0.1:8000/api/user-data/", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        const userData = res.data;

        // ✅ Map backend user fields → your form fields
        setFormData(prev => ({
          ...prev,
          examinerName: userData.fullName || "",
          phone: userData.phone || "",
          address: userData.address || "",
          bankName: userData.bankName || "",
        }));

        // User prefill loaded successfully

      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchFormData();
  }, [prefillData, shouldPrefill]);

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formObject = Object.fromEntries(data.entries());

    try {
      await submitForm(formObject);
      generatePdf(formObject);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Update existing form (when editing from MessagesCard)
  const handleUpdate = async () => {
    // Use current formData state rather than relying on an event target
    const formObject = formData || {};

    // need doc id in prefillData.id
    const docId = prefillData?.id;
    if (!docId) {
      showToast("No document id to update", "error");
      return;
    }

    try {
      await updateForm(docId, formObject);
      // after successful update, navigate back to dashboard (or show confirmation)
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  const editable = location.state?.editable;

  const actions = (
    <div className="text-center">
      {editable ? (
        <button
          type="button"
          onClick={handleUpdate}
          className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700"
        >
          Update Bill
        </button>
      ) : (
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Bill
        </button>
      )}
    </div>
  );

  return (
    <SharedForm
      title="University Bill"
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      actions={actions}
    />
  );
}
