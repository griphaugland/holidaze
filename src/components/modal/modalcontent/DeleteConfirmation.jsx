import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function DeleteModal({ text, isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this {text}?</p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className={`btn-primary-reverse py-2 px-4 bg-white transition duration-300 `}
          >
            Cancel
            <ArrowBackIcon />
          </button>
          <button
            type="submit"
            onClick={onDelete}
            className={` btn-delete btn-logout py-2 px-4 text-white transition duration-300 `}
          >
            Delete
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
