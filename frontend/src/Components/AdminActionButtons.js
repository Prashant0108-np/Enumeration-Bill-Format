export function AdminActionButtons({ onRemark, onUpdate, onDelete }) {
  return (
    <div className="flex gap-4 justify-center mt-6">
      <button
        type="button"
        onClick={onRemark}
        className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
      >
        Remark
      </button>

      <button
        type="button"
        onClick={onUpdate}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
      >
        Update
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}
