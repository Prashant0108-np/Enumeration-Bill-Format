import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import CreateForm from "./CreateForm";
import AdminPanel from "./Admin";
import AdminViewForm from "./AdminViewForm";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/fill-form" element={<CreateForm />} /> 
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin-view-form" element={<AdminViewForm />} />
    </Routes>
  );
}

export default App;
