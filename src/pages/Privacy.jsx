import React, { useEffect } from "react";

function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy policy | Holidaze";
  }, []);

  return (
    <div className="align-top-header flex flex-col justify-center items-center">
      <div className="flex page-max-width justify-between w-full flex-col p-4">
        <div className="flex justify-between flex-wrap gap-2 md:justify-between mx-4 px-0 p-4 items-center">
          <h1 className="text-2xl poppins-bold sm:w-auto">Privacy</h1>
        </div>
        <div className="container mx-auto">
          <p className="text-lg poppins-regular text-gray-600">
            We take your privacy seriously. We do not share your information
            with any third party. We only use your information to provide you
            with the best experience on our platform. If you have any questions
            or concerns about your privacy, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
