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
  const [formData, setFormDataRaw] = useState({});
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
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
        setFormDataRaw(prefillData);
        return;
      }

      // ✅ Case 2: Prefill user Firestore data
      if (!shouldPrefill) return;

      const user = auth.currentUser;
      if (!user) return;
      const idToken = await user.getIdToken();

      try {
        const res = await axios.get("https://enumeration-bill-format.onrender.com/api/user-data/", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        const userData = res.data;

        // ✅ Map backend user fields → your form fields
        setFormDataRaw(prev => ({
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

  // Helper: Convert number to words (simple, for rupees)
  function numberToWords(num) {
    if (!num || isNaN(num)) return "";
    const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    function inWords(n) {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + inWords(n % 100) : "");
      if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + inWords(n % 1000) : "");
      if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + inWords(n % 100000) : "");
      return n.toString();
    }
    return inWords(Number(num)) + " Rupees Only";
  }

  const setFormData = (newData) => {
    const merged = { ...formData, ...newData };

    const papersSet = parseInt(merged.papersSet) || 0;
    const paperRate = parseInt(merged.paperRate) || 0;

    const noOfScripts = parseInt(merged.practicalNoOfValuedScripts) || 0;
    const scriptRate = parseInt(merged.practicalRatePerValuedScript) || 0;

    const noOfCandidates = parseInt(merged.practicalConductNoOfCandidates) || 0;
    const ratePerCandidate = parseInt(merged.practicalConductRatePerCandidate) || 0;

    const ratePerDissertation = parseInt(merged.practicalValuationRatePerDissertation) || 0;

    const totalPartA =
      papersSet * paperRate +
      noOfScripts * scriptRate +
      noOfCandidates * ratePerCandidate +
      noOfCandidates * ratePerDissertation;

    merged.totalPartA = totalPartA;

    if ("convAmount" in newData) merged.totalPartB = newData.convAmount;
    if ("contAmount" in newData) merged.totalPartC = newData.contAmount;

    const a = parseInt(merged.totalPartA) || 0;
    const b = parseInt(merged.totalPartB) || 0;
    const c = parseInt(merged.totalPartC) || 0;

    const grandTotal = a + b + c;
    merged.grandTotal = grandTotal || "";
    merged.grandTotalWords = grandTotal ? numberToWords(grandTotal) : "";

    setFormDataRaw(merged);
  };

  const integerFields = [
    "totalPartA", "totalPartB", "totalPartC", "grandTotal",
    "taKms", "taAmount",
    "convKms", "convAmount",
    "contAmount"
  ];

  const validateForm = (formObject) => {
    const newErrors = {};
    Object.entries(formObject).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        newErrors[key] = "This field is required.";
      } else if (integerFields.includes(key)) {
        if (!/^\d+$/.test(value)) {
          newErrors[key] = "Please enter a valid integer.";
        }
      }
    });
    return newErrors;
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formObject = Object.fromEntries(data.entries());

    const validationErrors = validateForm(formObject);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      const firstErr = Object.values(validationErrors)[0] || "Please fill all required fields correctly.";
      setMessage("Please fill all required fields correctly.");
      showToast(firstErr, "error");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

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
  // If this page was opened with prefillData (an existing submitted document)
  // and not explicitly editable, treat it as a read-only view (submitted form view).
  // Do NOT treat the "for myself" prefill (which fetches user data) as readonly.
  const readonly = !!prefillData && !editable;

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
      ) : // If this is a prefilled (existing document) page and not editable,
      // don't show submit (read-only viewer). Otherwise show Submit for new forms
      // including the "for myself" prefill flow.
      prefillData && !editable ? (
        <></>
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
      readonly={readonly}
    />
  );
}
