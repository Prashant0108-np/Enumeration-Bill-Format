import axios from "axios";
import { auth } from "../firebase";
import { showToast } from "../utils/toast";

export const useAdminActions = () => {
  const handleRemarkSubmit = async (formData, remarkText, setFormData, setShowRemarkPopup) => {
    if (!remarkText.trim()) {
      showToast("Remark cannot be empty.", "error");
      return;
    }

    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();

      await axios.post(
        `http://127.0.0.1:8000/api/exam-bill/remark/${formData.id}/`,
        { remark: remarkText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast("Remark saved successfully!", "success");
      setFormData({ ...formData, remark: remarkText });
      setShowRemarkPopup(false);
    } catch (err) {
      console.error(err);
      showToast("Failed to save remark", "error");
    }
  };

  const handleUpdate = async (formData) => {
    if (!window.confirm("Save the updated changes?")) return;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const token = await user.getIdToken();

      await axios.patch(
        `http://127.0.0.1:8000/api/exam-bill/update/${formData.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast("Updated successfully!", "success");
    } catch (err) {
      console.error("Update Error:", err);
      showToast("Failed to update data", "error");
    }
  };

  const handleDelete = async (formDataId) => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;

    try {
      const user = auth.currentUser;
      const token = await user.getIdToken();

      await axios.delete(
        `http://127.0.0.1:8000/api/exam-bill/delete/${formDataId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast("Form deleted successfully!", "success");
      window.location.href = "/admin";
    } catch (error) {
      console.error("Delete Error:", error);
      showToast("Failed to delete form.", "error");
    }
  };

  return { handleRemarkSubmit, handleUpdate, handleDelete };
};
