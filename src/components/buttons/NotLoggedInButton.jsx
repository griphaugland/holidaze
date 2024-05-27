import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useGeneral } from "../../store";
import Modal from "../modal/Modal";
import useModal from "../modal/useModal";
import LoginModalContent from "../modal/modalcontent/LoginModalContent";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
function NotLoggedInButton({ headerColor, text }) {
  const { isVisible, showModal, hideModal } = useModal();
  const { isLoggedIn, loading, setLoading } = useGeneral();

  const handleClick = () => {
    setLoading(true);
    showModal();
    setLoading(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <button
          name="go to my bookings"
          className={` ${loading ? "bg-gray-400 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          <Link
            name="go to my bookings"
            className={
              "flex items-center justify-start gap-1 " +
              (headerColor ? "white-hover-text" : "blue-hover-text")
            }
            style={{ color: headerColor ? "#ffffff" : "#103954" }}
            to="my-bookings"
          >
            {text}
          </Link>
        </button>
      ) : (
        <>
          <button
            name="go to log in"
            onClick={handleClick}
            className={` ${loading ? "bg-gray-400 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            <div
              className={
                "flex items-center justify-start gap-1 " +
                (headerColor ? "white-hover-text" : "blue-hover-text")
              }
              style={{ color: headerColor ? "#ffffff" : "#103954" }}
            >
              {text}
            </div>
          </button>
          <Modal isVisible={isVisible} hideModal={hideModal}>
            <LoginModalContent />
          </Modal>
        </>
      )}
    </>
  );
}

export default NotLoggedInButton;
