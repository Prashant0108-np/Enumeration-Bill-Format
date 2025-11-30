import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function MessagesCard({ forms, loading }) {
  const navigate = useNavigate();

  const remarkForms = Array.isArray(forms) ? forms.filter((f) => f.remark) : [];

  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="flex items-center space-x-4 mb-4">
        <FaEnvelope className="text-purple-500 text-3xl" />
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>

      <p className="text-gray-600 mb-2">Check your notifications</p>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          <p className="ml-2 text-gray-600">Loading messages...</p>
        </div>
      ) : remarkForms.length === 0 ? (
        <p className="text-gray-500">No remarks from admin yet.</p>
      ) : (
        <ul className="space-y-4">
          {remarkForms.map((form) => (
            <li
              key={form.id}
              className="border p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 shadow-sm hover:shadow-md transition flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {form.examinerName} ({form.cno})
                </p>
                <p className="text-gray-500 text-sm">{form.examType} • {form.date || ''}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 bg-white rounded shadow text-sm text-gray-700 max-w-xs break-words">
                  {form.remark}
                </div>

                <button
                  onClick={() =>
                    navigate("/fill-form", {
                      state: { prefill: true, prefillData: form, editable: true },
                    })
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition"
                >
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
