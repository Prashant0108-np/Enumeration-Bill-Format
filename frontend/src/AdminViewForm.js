import { useLocation } from "react-router-dom";
import { useState } from "react";
import SharedForm from "./Components/SharedForm";
import { RemarkPopup } from "./Components/RemarkPopup";
import { AdminActionButtons } from "./Components/AdminActionButtons";
import { useAdminActions } from "./hooks/useAdminActions";
import { showToast } from "./utils/toast";

export default function AdminFormView() {
  const [showRemarkPopup, setShowRemarkPopup] = useState(false);
  const [remarkText, setRemarkText] = useState("");

  const location = useLocation();
  const prefillData = location.state?.prefillData || {};
  const [formData, setFormData] = useState(prefillData);

  const { handleRemarkSubmit, handleUpdate, handleDelete } = useAdminActions();

  const handleRemarkClick = async () => {
    if (!remarkText.trim()) {
      showToast("Remark cannot be empty.", "error");
      return;
    }
    await handleRemarkSubmit(formData, remarkText, setFormData, setShowRemarkPopup);
    setRemarkText("");
  };

  const handleUpdateClick = async () => {
    await handleUpdate(formData);
  };

  const handleDeleteClick = async () => {
    await handleDelete(formData.id);
  };

  const actions = (
    <>
      <RemarkPopup
        isOpen={showRemarkPopup}
        remarkText={remarkText}
        setRemarkText={setRemarkText}
        onSubmit={handleRemarkClick}
        onCancel={() => {
          setShowRemarkPopup(false);
          setRemarkText("");
        }}
      />

      <AdminActionButtons
        onRemark={() => setShowRemarkPopup(true)}
        onUpdate={handleUpdateClick}
        onDelete={handleDeleteClick}
      />
    </>
  );

  return (
    <SharedForm
      title="Admin View — University Bill"
      formData={formData}
      setFormData={setFormData}
      actions={actions}
    />
  );
}
