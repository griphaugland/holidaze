import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useGeneral } from "../../store";
import Modal from "../modal/Modal";
import useModal from "../modal/useModal";
import LoginModalContent from "../modal/modalcontent/LoginModalContent";
import BookingModalContent from "../modal/modalcontent/Booking";

function ButtonPrimary({ text }) {
  const { isVisible, showModal, hideModal } = useModal();
  const { isLoggedIn, loading, setLoading } = useGeneral();

  const handleClick = () => {
    setLoading(true);
    showModal();
    setLoading(false);
  };

  return (
    <>
      <button
        name="button primary"
        onClick={handleClick}
        className={`btn-primary text-sm poppins-semibold flex items-center justify-between ${
          loading ? "bg-gray-400 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        <p>{isLoggedIn ? text : "Log in to book"}</p>
        <ArrowForwardIcon />
      </button>
      <Modal isVisible={isVisible} hideModal={hideModal}>
        {isLoggedIn ? <BookingModalContent /> : <LoginModalContent />}
      </Modal>
    </>
  );
}

export default ButtonPrimary;
