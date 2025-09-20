import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
<<<<<<< HEAD
import Profile from "./Components/Profile";

=======
>>>>>>> b6dc7a755cdfb451d5876dedec04192cebe3abb9

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
      <Route path="/profile" element={<Profile />} />
=======
>>>>>>> b6dc7a755cdfb451d5876dedec04192cebe3abb9
    </Routes>
  );
}

export default App;
