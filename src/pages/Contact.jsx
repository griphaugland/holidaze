import React, { useEffect } from "react";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="align-top-header">Contact</div>;
}

export default Contact;
