import React, { useEffect } from "react";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="align-top-header  flex flex-col justify-center items-center">
      <div className="flex page-max-width justify-between w-full flex-col p-4">
        Contact
      </div>
    </div>
  );
}

export default Contact;
