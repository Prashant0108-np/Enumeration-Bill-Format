import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { showToast } from "./utils/toast";

export default function CompleteProfile() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ fullName: "", phone: "", address: "", bankName: "", role: "user" });
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/");
        return;
      }
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setForm({
            fullName: data.fullName || "",
            phone: data.phone || "",
            address: data.address || "",
            bankName: data.bankName || "",
            role: data.role || "user",
          });
        } else {
          setForm((f) => ({ ...f, role: "user" }));
        }
      } catch (err) {
        console.error("Error loading user record:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate]);

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      showToast("Not authenticated", "error");
      navigate("/");
      return;
    }

    if (!form.fullName || !form.phone || !form.address || !form.bankName) {
      showToast("Please complete all fields", "error");
      return;
    }

    try {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        await updateDoc(ref, {
          fullName: form.fullName,
          phone: form.phone,
          address: form.address,
          bankName: form.bankName,
          role: form.role || "user",
        });
      } else {
        await setDoc(ref, {
          fullName: form.fullName,
          phone: form.phone,
          address: form.address,
          bankName: form.bankName,
          email: user.email || "",
          role: form.role || "user",
          createdAt: new Date(),
        });
      }

      showToast("Profile completed", "success");
      // navigate based on role
      if ((form.role || "user") === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      console.error("Error saving profile:", err);
      showToast("Failed to save profile", "error");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Complete your profile</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <input value={form.fullName} onChange={handleChange("fullName")} placeholder="Full Name" className="w-full p-3 border rounded" />
          <input value={form.phone} onChange={handleChange("phone")} placeholder="Phone" className="w-full p-3 border rounded" />
          <input value={form.address} onChange={handleChange("address")} placeholder="Address" className="w-full p-3 border rounded" />
          <input value={form.bankName} onChange={handleChange("bankName")} placeholder="Bank Name" className="w-full p-3 border rounded" />

          <div className="flex justify-end gap-3">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
