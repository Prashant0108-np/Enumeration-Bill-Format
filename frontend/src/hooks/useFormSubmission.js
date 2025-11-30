import axios from "axios";
import { auth } from "../firebase";
import { showToast } from "../utils/toast";

export const useFormSubmission = () => {
  const submitForm = async (formData) => {
    try {
      const user = auth.currentUser;
      const idToken = user ? await user.getIdToken() : null;

      const res = await axios.post(
        "https://enumeration-bill-format.onrender.com/api/exam-bill/",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken ? `Bearer ${idToken}` : undefined,
          },
        }
      );

      showToast(res.data.message || "Form submitted!", "success");
      return res.data;
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("Failed to submit form.", "error");
      throw error;
    }
  };

  const updateForm = async (docId, formData) => {
    try {
      const user = auth.currentUser;
      const idToken = user ? await user.getIdToken() : null;

      const res = await axios.patch(
        `https://enumeration-bill-format.onrender.com/api/exam-bill/update/${docId}/`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken ? `Bearer ${idToken}` : undefined,
          },
        }
      );

      showToast(res.data.message || "Form updated!", "success");
      return res.data;
    } catch (error) {
      console.error("Error updating form:", error);
      showToast("Failed to update form.", "error");
      throw error;
    }
  };

  return { submitForm, updateForm };
};
