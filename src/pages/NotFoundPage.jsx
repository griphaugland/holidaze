import React, { useEffect } from "react";

function NotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="align-top-header">NotFoundPage</div>;
}

export default NotFoundPage;
