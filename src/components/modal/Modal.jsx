import React from "react";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";

const Modal = () => {
  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen>
      <div className="modal">Test</div>
      <p>Modal content</p>
      <button onClick={hideModal}>Hide modal</button>
    </ReactModal>
  ));
  if (showModal) {
    /* document.querySelector("header").style.zIndex = 0; */
  }

  return <button onClick={showModal}>Show modal</button>;
};

export default Modal;
