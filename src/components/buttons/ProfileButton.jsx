import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useGeneral } from "../../store";
import Modal from "../modal/Modal";
import useModal from "../modal/useModal";
import LoginModalContent from "../modal/modalcontent/LoginModalContent";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
function ProfileButton({ headerColor }) {
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
          className={` ${loading ? "bg-gray-400 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          <Link className="flex items-center justify-start gap-1" to="profile">
            <div className="carticon-container">
              <AccountCircleOutlinedIcon
                style={{
                  color: headerColor ? "#ffffff" : "#103954",
                  fontSize: "2rem",
                }}
                className={
                  " " + (headerColor ? "white-hover-text" : "blue-hover-text")
                }
              />
            </div>
          </Link>
        </button>
      ) : (
        <>
          <button
            onClick={handleClick}
            className={` ${loading ? "bg-gray-400 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            <div className="flex items-center justify-start gap-1">
              <div className="carticon-container">
                <AccountCircleOutlinedIcon
                  style={{
                    color: headerColor ? "#ffffff" : "#103954",
                    fontSize: "2rem",
                  }}
                  className={
                    " " + (headerColor ? "white-hover-text" : "blue-hover-text")
                  }
                />
              </div>
            </div>
          </button>{" "}
          <Modal isVisible={isVisible} hideModal={hideModal}>
            <LoginModalContent />
          </Modal>
        </>
      )}
    </>
  );
}

export default ProfileButton;
