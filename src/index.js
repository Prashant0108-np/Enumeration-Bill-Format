import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

// Create the root element where the entire React application will be mounted.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the main component wrapped inside React.StripeMode and BrowserRouter.
// BrowserRouter enables client-side routing throughout the app.
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Optional performance measuring function.
// Developers can log results or send them to analytics tools.
reportWebVitals();
