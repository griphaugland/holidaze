import React, { useEffect } from "react";
import { useGeneral } from "../store";
import VenueList from "../components/venues/VenueList";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function Terms() {
  useEffect(() => {
    document.title = "Terms and Conditions | Holidaze";
  }, []);
  const { favorites, addToFavorites, removeFromFavorites, clearFavorites } =
    useGeneral();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleClearFavorites = () => {
    clearFavorites();
  };

  return (
    <div className="align-top-header flex flex-col justify-center items-center">
      <div className="flex page-max-width justify-between w-full flex-col p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl poppins-semibold text-black">
            Terms and Conditions
          </h1>
          <p className="text-base poppins-regular text-gray-600 my-4">
            Welcome to our website. If you continue to browse and use this
            website, you are agreeing to comply with and be bound by the
            following terms and conditions of use, which together with our
            privacy policy govern [Your Company Name]'s relationship with you in
            relation to this website. If you disagree with any part of these
            terms and conditions, please do not use our website.
          </p>
          <h2 className="text-xl poppins-bold text-gray-700 mt-4">
            Use of the Website
          </h2>
          <p className="text-base poppins-regular text-gray-600 my-4">
            The content of the pages of this website is for your general
            information and use only. It is subject to change without notice.
            Neither we nor any third parties provide any warranty or guarantee
            as to the accuracy, timeliness, performance, completeness, or
            suitability of the information and materials found or offered on
            this website for any particular purpose. You acknowledge that such
            information and materials may contain inaccuracies or errors and we
            expressly exclude liability for any such inaccuracies or errors to
            the fullest extent permitted by law.
          </p>
          <h2 className="text-xl poppins-bold text-gray-700 mt-4">
            User Accounts
          </h2>
          <p className="text-base poppins-regular text-gray-600 my-4">
            You may be required to create an account and specify a password to
            use certain features on the site. You agree to provide, maintain,
            and update true, accurate, current, and complete information about
            yourself as prompted by our registration processes. You may not
            impersonate any person or entity or misrepresent your identity or
            affiliation with any person or entity, including using another
            person’s username, password, or other account information.
          </p>
          <h2 className="text-xl poppins-bold text-gray-700 mt-4">
            Intellectual Property
          </h2>
          <p className="text-base poppins-regular text-gray-600 my-4">
            This website contains material which is owned by or licensed to us.
            This material includes, but is not limited to, the design, layout,
            look, appearance, and graphics. Reproduction is prohibited other
            than in accordance with the copyright notice, which forms part of
            these terms and conditions.
          </p>
          <h2 className="text-xl poppins-bold text-gray-700 mt-4">
            Limitation of Liability
          </h2>
          <p className="text-base poppins-regular text-gray-600 my-4">
            Your use of any information or materials on this website is entirely
            at your own risk, for which we shall not be liable. It shall be your
            own responsibility to ensure that any products, services, or
            information available through this website meet your specific
            requirements.
          </p>
          <h2 className="text-xl poppins-bold text-gray-700 mt-4">
            Venue verification
          </h2>
          <p className="text-base poppins-regular text-gray-600 my-4">
            Holidaze verifies the accuracy of the information provided by
            venues. It is the guarenteed that the venue is accurate information
            about their property. If you have any questions or concerns about a
            venue, please contact us
          </p>
          <h2 className="text-xl poppins-bold text-gray-700 mt-4">
            Cancellation Policy
          </h2>
          <p className="text-base poppins-regular text-gray-600 my-4">
            If an unforeseen event makes it impossible for you to reach your
            destination, Holidaze offers you free cancellation as long as the
            cancellation happens 24 hours before check in.
          </p>
          <h2 className="text-xl poppins-bold text-gray-700 mt-4">
            Governing Law
          </h2>
          <p className="text-base poppins-regular text-gray-600 my-4">
            Your use of this website and any dispute arising out of such use of
            the website is subject to the laws of [Your Country/State].
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
