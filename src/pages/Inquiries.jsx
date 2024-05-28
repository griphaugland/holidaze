import React, { useEffect } from "react";
import { useGeneral } from "../store";

function Inquiries() {
  const { favorites, addToFavorites, removeFromFavorites, clearFavorites } =
    useGeneral();

  useEffect(() => {
    document.title = "Inquiries | Holidaze";
  }, []);

  return (
    <div className="align-top-header flex flex-col justify-center items-center">
      <div className="flex page-max-width justify-between w-full flex-col p-4">
        <div className="flex justify-between flex-wrap gap-2 md:justify-between px-0 p-4 items-center">
          <h1 className="text-2xl poppins-bold text-black">Inquiries</h1>
        </div>
        <div className="container mx-auto">
          <p className="text-base poppins-regular text-gray-600 my-4">
            If you have any questions, comments, or concerns, please feel free
            to contact us using the information provided below. We aim to
            respond to all inquiries within 48 hours.
          </p>
          <h2 className="text-xl poppins-bold text-black mt-4">
            Contact Information
          </h2>
          <p className="text-base poppins-regular text-gray-600 my-4">
            Email: support@example.com
          </p>
          <p className="text-base poppins-regular text-gray-600 my-4">
            Phone: (123) 456-7890
          </p>
          <p className="text-base poppins-regular text-gray-600 my-4">
            Address: 123 Main Street, Anytown, USA
          </p>
        </div>
      </div>
    </div>
  );
}

export default Inquiries;
