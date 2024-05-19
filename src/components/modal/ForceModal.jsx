import React from "react";
import { motion } from "framer-motion";
import "../../css/components/modal/modal.css";

const Modal = ({ isVisible, children, hideModal, showModal }) =>
  isVisible ? (
    <div className="modal-overlay">
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </div>
  ) : null;

export default Modal;
