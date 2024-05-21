import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import { ModalProvider } from "react-modal-hook";
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

function Layout({ children }) {
  return (
    <ModalProvider rootComponent={TransitionGroup}>
      <div id="outer-container" className="min-h-svh flex flex-col ">
        <Header />
        <main className="flex flex-col flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ModalProvider>
  );
}

export default Layout;
