import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import { ModalProvider } from "react-modal-hook";
import ReactModal from "react-modal";
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
ReactModal.setAppElement("#root");

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
      {
        path: "venues/:id",
        element: <SingleVenue />,
      },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "favorites", element: <Favorites /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModalProvider rootComponent={TransitionGroup}>
      <RouterProvider router={router} />
    </ModalProvider>
  </React.StrictMode>
);
