import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { auth } from "../firebase";

export function FilledFormsCard({ forms, loading }) {
  const navigate = useNavigate();

  const currentUser = auth.currentUser;

  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="flex items-center space-x-4 mb-4">
        <FaUserCircle className="text-blue-500 text-3xl" />
        <h2 className="text-xl font-semibold">Filled Forms</h2>
      </div>

      <p className="text-gray-600 mb-4">Manage your Forms</p>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="ml-2 text-gray-600">Loading forms...</p>
        </div>
      ) : !Array.isArray(forms) || forms.length === 0 ? (
        <p className="text-gray-500">No forms submitted yet.</p>
      ) : (
        <ul className="space-y-2">
          {forms.map((form) => (
            <li
              key={form.id}
              className="border rounded p-3 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <span className="text-sm">
                <strong>{form.examinerName}</strong> — {form.examType} ({form.cno})
              </span>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                onClick={() => {
                  // Determine likely owner id field on the form object.
                  const ownerId =
                    form.userId || form.uid || form.owner || form.createdBy || (form.user && (form.user.uid || form.user.id));

                  const editable = currentUser && ownerId && currentUser.uid === ownerId;

                  navigate("/fill-form", {
                    state: { prefill: true, prefillData: form, editable },
                  });
                }}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
