import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import CreateForm from "./CreateForm";
import AdminPanel from "./Admin";
import AdminViewForm from "./AdminViewForm";
import CompleteProfile from "./CompleteProfile";
import PrivateRoute from "./PrivateRoute";
import RoleBasedRoute from "./RoleBasedRoute";

function App() {
      return (
            <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<RoleBasedRoute allowedRoles={["user"]}><Dashboard /></RoleBasedRoute>} />
                  <Route path="/fill-form" element={<RoleBasedRoute allowedRoles={["user"]}><CreateForm /></RoleBasedRoute>} />
                  <Route path="/complete-profile" element={<PrivateRoute><CompleteProfile /></PrivateRoute>} />
                  <Route path="/admin" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminPanel /></RoleBasedRoute>} />
                  <Route path="/admin-view-form" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminViewForm /></RoleBasedRoute>} />
            </Routes>
      );
}

export default App;
