import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const showModal = useCallback(() => setIsVisible(true), []);
  const hideModal = useCallback(() => setIsVisible(false), []);
  useEffect(() => {
    handleFreezeScroll(isVisible);
  }, [isVisible]);
  const { search } = useLocation();
  const navigate = useNavigate();
  const fromLogin = new URLSearchParams(search).get("redirect") === "login";

  useEffect(() => {
    if (location.pathname === "/login") {
      hideModal();
    }
    if (location.pathname === "/register") {
      if (fromLogin) {
        hideModal();
        location.search = "";
      }
    }
  }, [location.pathname, isVisible]);

  function handleFreezeScroll(toggle) {
    if (toggle) {
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector("header").style.paddingRight = "2rem";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.marginRight = "0px";
      document.querySelector("header").style.paddingRight = "1rem";
    }
  }
  return {
    isVisible,
    showModal,
    hideModal,
  };
};

export default useModal;
