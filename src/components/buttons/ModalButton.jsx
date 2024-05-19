import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useVenues } from "../../store";
import Modal from "../modal/Modal";
import useModal from "../modal/useModal";
import LoginModalContent from "../modal/modalcontent/LoginModalContent";
import BookingModalContent from "../modal/modalcontent/Booking";

function ButtonPrimary({ text, venue }) {
  const { isVisible, showModal, hideModal } = useModal();
  const { loggedIn, loading, setLoading } = useVenues();

  const handleClick = () => {
    setLoading(true);
    showModal();
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`btn-primary text-sm poppins-semibold flex items-center justify-between ${
          loading ? "bg-gray-400 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        <p>{loggedIn ? text : "Log in to book"}</p>
        <ArrowForwardIcon />
      </button>
      <Modal isVisible={isVisible} hideModal={hideModal}>
        {loggedIn ? (
          <BookingModalContent venue={venue} />
        ) : (
          <LoginModalContent />
        )}
      </Modal>
    </>
  );
}

export default ButtonPrimary;
