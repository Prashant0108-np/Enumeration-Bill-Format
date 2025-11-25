import { useState } from "react";
import { auth } from "../firebase";
import axios from "axios";

export function RemarkPopup({ isOpen, remarkText, setRemarkText, onSubmit, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-3">Add Remark</h2>

        <textarea
          placeholder="Write your remark here..."
          className="border rounded-lg w-full p-3 h-28"
          value={remarkText}
          onChange={(e) => setRemarkText(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={onSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
