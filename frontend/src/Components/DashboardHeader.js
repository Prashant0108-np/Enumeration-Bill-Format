import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export function DashboardHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-10 py-6 bg-white shadow">
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome Back 👋
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-xl shadow hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>
  );
}
