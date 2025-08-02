import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import List from "./pages/List";
import Stepperform from "./pages/Stepperform";
import Product from "./pages/sales/Listproduct";
import Addproduct from "./pages/sales/Addproduct";
import { RoleProvider } from "./context/RoleContext";
import ProtectedRoute from "./component/ProtectedRoute"; 

export default function App() {
  return (
    <RoleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/List"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <List />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Stepperform"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Stepperform />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Product"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Add-product"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Addproduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </RoleProvider>
  );
}
