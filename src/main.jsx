import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Layout from "./layout/Layout";
import NotFoundPage from "./pages/NotFoundPage.jsx";
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
import EditVenue from "./pages/EditVenue";
import SingleBooking from "./pages/SingleBooking.jsx";
import MyBookings from "./pages/MyBookings";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
import Inquiries from "./pages/Inquiries";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <App /> },
      { path: "venues", element: <Venues /> },
      { path: "venues/:id", element: <SingleVenue /> },
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
      { path: "terms", element: <Terms /> },
      { path: "privacy", element: <Privacy /> },
      { path: "inquiries", element: <Inquiries /> },
      { path: "help", element: <Help /> },
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
        path: "dashboard/edit-venue",
        element: (
          <ProtectedRoute access="loggedIn" venueManager="true">
            <EditVenue />
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
      {
        path: "bookings/:bookingId?",
        element: (
          <ProtectedRoute access="loggedIn">
            <SingleBooking />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <ProtectedRoute access="loggedIn">
            <MyBookings />
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
