import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import CreateForm from "./CreateForm";
import AdminPanel from "./Admin";
import AdminViewForm from "./AdminViewForm";

function App() {
  return (
    <Routes>
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
