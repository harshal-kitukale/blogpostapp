import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/RegisterPage";
import Login from "../pages/Login";
import Layout from "../components/Layout";
import Blogs from "../pages/Blogs";
import SingleBlog from "../pages/SingleBlog";
import Admin from "../pages/Admin";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route path="/blogs/:id" element={<SingleBlog />} />
    </Routes>
  );
};

export default AllRoutes;
