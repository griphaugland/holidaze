import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useVenues } from "../../store";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import useModal from "../modal/useModal";
import LoginModalContent from "../modal/modalcontent/LoginModalContent";
import BookingModalContent from "../modal/modalcontent/Booking";

function ButtonPrimary({ text, venue }) {
  const { isVisible, showModal, hideModal } = useModal();
  const loggedIn = useVenues((state) => state.loggedIn);
  if (loggedIn) {
    return (
      <>
        <button
          onClick={showModal}
          className="btn-primary text-sm poppins-semibold"
        >
          <p className="">{text}</p>
          <ArrowForwardIcon />
        </button>
        <Modal isVisible={isVisible} hideModal={hideModal}>
          <BookingModalContent venue={venue} />
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <button
          onClick={showModal}
          className="btn-primary text-sm poppins-semibold"
        >
          <p className="">Log in to book</p>
          <ArrowForwardIcon />
        </button>
        <Modal isVisible={isVisible} hideModal={hideModal}>
          <LoginModalContent />
        </Modal>
      </>
    );
  }
}

export default ButtonPrimary;
