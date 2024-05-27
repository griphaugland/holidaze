import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useGeneral } from "../../store";
import Modal from "../modal/Modal";
import useModal from "../modal/useModal";
import UpdateInfoModal from "../modal/modalcontent/UpdateInfoModal";

function EditMediaButton({ text, venue }) {
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
        onClick={handleClick}
        className={`btn-secondary-reverse text-sm poppins-semibold flex items-center justify-between ${
          loading ? "bg-gray-400 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        <p>{isLoggedIn && "Edit profile"}</p>
        <ArrowForwardIcon />
      </button>
      <Modal isVisible={isVisible} hideModal={hideModal}>
        <UpdateInfoModal hideModal={hideModal} onFinish={() => {}} />
      </Modal>
    </>
  );
}

export default EditMediaButton;
