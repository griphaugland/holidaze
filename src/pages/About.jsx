import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div className="align-top-header">About</div>;
}

export default About;
