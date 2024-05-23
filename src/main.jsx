import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Layout from "./layout/Layout";
import Contact from "./pages/Contact";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import About from "./pages/About";
import Venues from "./pages/Venues";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import SingleVenue from "./pages/SingleVenue";
import ErrorPage from "./pages/Error";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CreateVenue from "./pages/CreateVenue";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <App /> },
      { path: "venues", element: <Venues /> },
      { path: "venues/:id", element: <SingleVenue /> },
      { path: "about", element: <About /> },
      {
        path: "register",
        element: (
          <ProtectedRoute access="notLoggedIn">
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedRoute access="notLoggedIn">
            <Login />
          </ProtectedRoute>
        ),
      },
      { path: "error", element: <ErrorPage /> },
      { path: "contact", element: <Contact /> },
      { path: "favorites", element: <Favorites /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute access="loggedIn" venueManager="true">
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/create-venue",
        element: (
          <ProtectedRoute access="loggedIn" venueManager="true">
            <CreateVenue />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/:username?",
        element: (
          <ProtectedRoute access="loggedIn">
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
