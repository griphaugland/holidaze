import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Contact from "./pages/Contact";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import About from "./pages/About";
import Venues from "./pages/Venues";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <App /> },
      {
        path: "venues",
        element: <Venues />,
      },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "favorites", element: <Favorites /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "*", element: <NotFoundPage /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
