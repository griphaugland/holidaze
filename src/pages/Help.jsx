import React, { useEffect } from "react";
import { useGeneral } from "../store";

function Help() {
  const { favorites, addToFavorites, removeFromFavorites, clearFavorites } =
    useGeneral();

  useEffect(() => {
    document.title = "Help | Holidaze";
  }, []);

  return (
    <div className="align-top-header flex flex-col justify-center items-center">
      <div className="flex page-max-width justify-between w-full flex-col p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl poppins-bold text-black">Help</h1>
          <p className="text-base poppins-regular text-gray-600 my-4">
            Welcome to our Help page. Here you can find answers to common
            questions and issues you may encounter. If you need further
            assistance, please do not hesitate to reach out to our support team.
          </p>
          <h2 className="text-xl poppins-bold text-gray-700 mt-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base poppins-regular text-gray-600 my-4">
            Q: How do I create an account?
            <br />
            A: Click on the "Register" button at the top right corner of the
            page and fill in the required details.
          </p>
          <p className="text-base poppins-regular text-gray-600 my-4">
            Q: How can I reset my password?
            <br />
            A: Click on the "Forgot Password" link on the login page and follow
            the instructions.
          </p>
          <p className="text-base poppins-regular text-gray-600 my-4">
            Q: How do I contact customer support?
            <br />
            A: You can contact our customer support by emailing
            support@holidaze.com or calling (123) 456-7890.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Help;
