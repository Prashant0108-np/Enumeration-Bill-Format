// frontend/src/AdminDashboard.js
import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [forms, setForms] = useState([]);

  // Simulate fetching submitted forms from backend
  useEffect(() => {
    // Replace this with your actual API call
    setForms([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "Pending"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        status: "Pending"
      }
    ]);
  }, []);

  const handleApprove = (id) => {
    setForms(forms.map(form => form.id === id ? { ...form, status: "Approved" } : form));
  };

  const handleReject = (id) => {
    setForms(forms.map(form => form.id === id ? { ...form, status: "Rejected" } : form));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
      padding: "2rem"
    }}>
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
        padding: "2rem"
      }}>
        <h2 style={{ color: "#185a9d", marginBottom: "2rem" }}>Admin Dashboard</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#43cea2", color: "#fff" }}>
              <th style={{ padding: "1rem", borderRadius: "6px 0 0 6px" }}>Name</th>
              <th style={{ padding: "1rem" }}>Email</th>
              <th style={{ padding: "1rem" }}>Status</th>
              <th style={{ padding: "1rem", borderRadius: "0 6px 6px 0" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map(form => (
              <tr key={form.id} style={{ background: "#f9f9f9" }}>
                <td style={{ padding: "1rem" }}>{form.name}</td>
                <td style={{ padding: "1rem" }}>{form.email}</td>
                <td style={{ padding: "1rem", fontWeight: "bold", color: form.status === "Approved" ? "#43cea2" : form.status === "Rejected" ? "#d9534f" : "#185a9d" }}>{form.status}</td>
                <td style={{ padding: "1rem" }}>
                  {form.status === "Pending" && (
                    <>
                      <button onClick={() => handleApprove(form.id)} style={{
                        background: "#43cea2",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.5rem 1rem",
                        marginRight: "0.5rem",
                        cursor: "pointer"
                      }}>Approve</button>
                      <button onClick={() => handleReject(form.id)} style={{
                        background: "#d9534f",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.5rem 1rem",
                        cursor: "pointer"
                      }}>Reject</button>
                    </>
                  )}
                  {form.status !== "Pending" && <span>No actions</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;