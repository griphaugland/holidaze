import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Logo from "/logo.svg?url";
import LogoBlue from "/logoBlue.svg?url";
import { useVenues } from "../store";

function Header() {
  const [headerColor, setHeaderColor] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [animate, setAnimate] = useState(false);
  const cart = useVenues((state) => state.favorites);
  const location = useLocation(); // Get current location object

  useEffect(() => {
    // Set header color based on the scroll position and path
    const checkScrollAndPath = () => {
      if (window.scrollY > 40 || location.pathname !== "/") {
        setHeaderColor(false);
      } else {
        setHeaderColor(true);
      }
    };

    // Attach the scroll listener only on the home page
    if (location.pathname === "/") {
      window.addEventListener("scroll", checkScrollAndPath);
    }

    // Run on mount and when the path changes
    checkScrollAndPath();

    // Cleanup function to remove the scroll listener and reset the header color
    return () => {
      window.removeEventListener("scroll", checkScrollAndPath);
      if (location.pathname !== "/") {
        setHeaderColor(false);
      }
    };
  }, [location]); // Depend on location

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else if (window.innerWidth > 768) {
      setMobile(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else if (window.innerWidth > 768) {
        setMobile(false);
      }
    });
  }, []);
  if (mobile) {
    return (
      <header
        className={
          "top-0 w-full flex items-center fixed p-4 " +
          (headerColor ? "bg-transparent" : "bg-white")
        }
      >
        <div className="flex justify-between w-full">
          <Link to="" className="logo-container no-hover-effect">
            <img
              className="logo"
              src={headerColor ? Logo : LogoBlue}
              alt="holidaze logo"
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              className="carticon-container"
              onClick={() => {
                setToggle(false);
              }}
              to="cart"
            >
              <FavoriteBorderOutlinedIcon
                style={{ color: headerColor ? "#ffffff" : "#103954" }}
              />
            </Link>
            <button
              onClick={() => {
                setToggle(!toggle);
                setAnimate(!toggle);
              }}
              className="text-2xl font-bold"
            >
              {toggle ? (
                <CloseIcon
                  style={{
                    fontSize: "2rem",
                    color: headerColor ? "#ffffff" : "#103954",
                  }}
                />
              ) : (
                <MenuIcon
                  style={{
                    fontSize: "2rem",
                    color: headerColor ? "#ffffff" : "#103954",
                  }}
                />
              )}
            </button>
          </div>
        </div>
        {toggle && (
          <nav
            className={
              "text-xl font-bold flex flex-col my-4 " +
              (animate ? "animateMenu" : "")
            }
          >
            <Link
              className="flex items-center justify-start gap-1 min-w-36"
              to=""
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Home
            </Link>
            <Link
              className="flex items-center justify-start gap-1 min-w-36"
              to="venues"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Venues
            </Link>
            <Link
              className="flex items-center justify-start gap-1 min-w-36"
              to="contact"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Contact
            </Link>
            <Link
              className="flex items-center justify-start gap-1 min-w-36"
              to="cart"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <FavoriteBorderOutlinedIcon />
            </Link>
          </nav>
        )}
      </header>
    );
  } else {
    return (
      <header
        className={
          "flex flex-row justify-center items-center p-4 " +
          (headerColor ? "bg-transparent" : "bg-white")
        }
      >
        <Link to="" className="logo-container mr-auto">
          <img
            className="logo"
            src={headerColor ? Logo : LogoBlue}
            alt="holidaze logo"
          />
        </Link>
        <nav className="text-l flex poppins-regular text-sm tracking-widest flex-row gap-8">
          <Link
            className="flex items-center justify-start gap-1"
            style={{ color: headerColor ? "#ffffff" : "#103954" }}
            to=""
          >
            HOME
          </Link>
          <Link
            className="flex items-center justify-start gap-1"
            style={{ color: headerColor ? "#ffffff" : "#103954" }}
            to="venues"
          >
            VENUES
          </Link>
          <Link
            className="flex items-center justify-start gap-1"
            style={{ color: headerColor ? "#ffffff" : "#103954" }}
            to="contact"
          >
            CONTACT
          </Link>
        </nav>
        <div className="flex items-center opposite-logo gap-4 ml-auto">
          <Link className="flex items-center justify-start gap-1" to="cart">
            <div className="carticon-container">
              <FavoriteBorderOutlinedIcon
                style={{
                  color: headerColor ? "#ffffff" : "#103954",
                  fontSize: "2rem",
                }}
              />
            </div>
          </Link>
          <Link className="flex items-center justify-start gap-1" to="cart">
            <div className="carticon-container">
              <AccountCircleOutlinedIcon
                style={{
                  color: headerColor ? "#ffffff" : "#103954",
                  fontSize: "2rem",
                }}
              />
            </div>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
