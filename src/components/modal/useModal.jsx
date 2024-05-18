import { useState, useCallback, useEffect } from "react";

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = useCallback(() => setIsVisible(true), []);
  const hideModal = useCallback(() => setIsVisible(false), []);
  useEffect(() => {
    handleFreezeScroll(isVisible);
  }, [isVisible]);

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
