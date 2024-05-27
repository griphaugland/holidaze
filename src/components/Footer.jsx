import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LogoBlue from "/logoBlue.svg?url";
import { Link } from "react-router-dom";
import pattern from "/patternRounded.svg?url";

function Footer() {
  return (
    <footer className="secondary-bg flex items-center">
      <div className="flex gap-4 footer-height w-full h-full p-6 flex-col justify-between text-gray-800">
        <div className="footer-categories-container flex-wrap flex justify-start items-start gap-4 flex-row w-full h-full ">
          <div className="footer-category p-3 flex flex-col gap-5 justify-center">
            <p className="poppins-medium text-xl min-w-28">Policies</p>
            <Link
              to="terms"
              target="_blank"
              rel="noreferrer"
              className="category-option arrow-move pt-sans-regular flex justify-between"
            >
              <p>Terms</p>
              <ArrowForwardIcon style={{ width: "60px", height: "23px" }} />
            </Link>
            <Link
              to="privacy"
              target="_blank"
              rel="noreferrer"
              className="category-option arrow-move pt-sans-regular flex justify-between"
            >
              <p>Privacy</p>
              <ArrowForwardIcon style={{ width: "60px", height: "23px" }} />
            </Link>
          </div>
          <div className="footer-category p-3  flex flex-col gap-5 justify-center">
            <p className="poppins-medium text-xl">Get in touch</p>
            <Link
              to="help"
              target="_blank"
              rel="noreferrer"
              className="category-option arrow-move pt-sans-regular flex justify-between"
            >
              <p>Help</p>
              <ArrowForwardIcon style={{ width: "60px", height: "23px" }} />
            </Link>
            <Link
              to="/inquiries"
              target="_blank"
              rel="noreferrer"
              className="category-option arrow-move pt-sans-regular flex justify-between"
            >
              <p>Inquiries</p>
              <ArrowForwardIcon style={{ width: "60px", height: "23px" }} />
            </Link>
          </div>
          <div className="footer-category p-3 flex flex-col justify-center">
            <p className="poppins-medium  text-xl mb-2">Socials</p>
            <div className="category-option pt-sans-regular max-w-18 flex flex-wrap justify-start mb-2 gap-2">
              <a
                name="facebook link"
                href="https://www.facebook.com/holidaze"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon style={{ width: "38px", height: "38px" }} />
              </a>
              <a
                name="instagram link"
                href="https://www.instagram.com/holidaze"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon style={{ width: "38px", height: "38px" }} />
              </a>
            </div>
            <div className="category-option pt-sans-regular flex justify-between">
              <a
                name="linkedin link"
                href="https://www.linkedin.com/holidaze"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon style={{ width: "38px", height: "38px" }} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-logo-container w-full">
          <Link
            to=""
            className="logo-container no-hover-effect w-full flex justify-start"
          >
            <img className="logo" src={LogoBlue} alt="holidaze logo" />
          </Link>
          <p className=" text-sm poppins-thin">© 2024 holidaze, Inc.</p>
        </div>
      </div>
      <div className="flex justify-center footer-height items-center w-full h-full p-3 flex-col text-gray-800">
        <img src={pattern} alt="logo" className="mt-5" />
      </div>
    </footer>
  );
}

export default Footer;
