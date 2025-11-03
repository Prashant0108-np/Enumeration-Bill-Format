import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import CreateForm from "./CreateForm";
import AdminPanel from "./Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/fill-form" element={<CreateForm />} /> 
        <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
