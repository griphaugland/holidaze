import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Logo from "/logo.svg?url";
import LogoBlue from "/logoBlue.svg?url";
import LogoutButton from "./buttons/LogoutButton";
import { useVenues } from "../store";
import ForceModal from "./modal/ForceModal";
import useModal from "../components/modal/useModal";

function Header() {
  const [headerColor, setHeaderColor] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [animate, setAnimate] = useState(false);
  const location = useLocation(); // Get current location object
  const { apiKey, user, isLoggedIn } = useVenues();
  const { showModal, hideModal, isVisible } = useModal();
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
    handleFreezeScroll(toggle);
  }, [toggle]);

  function handleFreezeScroll(toggle) {
    if (toggle) {
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector("header").style.paddingRight = "2rem";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.marginRight = "0px";
      document.querySelector("header").style.paddingRight = "1rem";
    }
  }

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

  useEffect(() => {
    /*     if (!apiKey || apiKey.data.status !== "ACTIVE") {
      showModal();
      console.log("API key is not active");
    } else {
      console.log("API key is active");
      hideModal();
    } */
  }, [apiKey, showModal, hideModal]);

  if (mobile) {
    return (
      <header
        className={
          "top-0 w-full flex items-center fixed p-4 " +
          (toggle
            ? headerColor
              ? "bg-white"
              : "bg-white"
            : headerColor
            ? "bg-transparent"
            : "bg-white")
        }
      >
        <div className="flex justify-between w-full">
          <Link
            to=""
            className="logo-container no-hover-effect"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.location.reload();
              }
            }}
          >
            <img
              className="logo"
              src={
                toggle
                  ? headerColor
                    ? LogoBlue
                    : LogoBlue
                  : headerColor
                  ? Logo
                  : LogoBlue
              }
              alt="holidaze logo"
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              className="carticon-container"
              onClick={() => {
                setToggle(false);
              }}
              to="favorites"
            >
              <FavoriteBorderOutlinedIcon
                style={{
                  color: toggle
                    ? headerColor
                      ? "#103954"
                      : "#103954"
                    : headerColor
                    ? "#ffffff"
                    : "#103954",
                }}
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
                    color: toggle
                      ? headerColor
                        ? "#103954"
                        : "#103954"
                      : headerColor
                      ? "#ffffff"
                      : "#103954",
                  }}
                />
              ) : (
                <MenuIcon
                  style={{
                    fontSize: "2rem",
                    color: toggle
                      ? headerColor
                        ? "#103954"
                        : "#103954"
                      : headerColor
                      ? "#ffffff"
                      : "#103954",
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
        <Link
          to=""
          className="logo-container mr-auto"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              window.location.reload();
            }
          }}
        >
          <img
            className="logo"
            src={headerColor ? Logo : LogoBlue}
            alt="holidaze logo"
          />
        </Link>
        <nav className="text-l flex poppins-regular text-sm tracking-widest flex-row gap-8">
          <Link
            className={
              "flex items-center justify-start gap-1 " +
              (headerColor ? "white-hover-text" : "blue-hover-text")
            }
            style={{ color: headerColor ? "#ffffff" : "#103954" }}
            to=""
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.location.reload();
              }
            }}
          >
            HOME
          </Link>
          <Link
            className={
              "flex items-center justify-start gap-1 " +
              (headerColor ? "white-hover-text" : "blue-hover-text")
            }
            style={{ color: headerColor ? "#ffffff" : "#103954" }}
            to="venues"
            onClick={(e) => {
              if (location.pathname === "/venues") {
                e.preventDefault();
                window.location.reload();
              }
            }}
          >
            VENUES
          </Link>
          <Link
            className={
              "flex items-center justify-start gap-1 " +
              (headerColor ? "white-hover-text" : "blue-hover-text")
            }
            style={{ color: headerColor ? "#ffffff" : "#103954" }}
            to="contact"
            onClick={(e) => {
              if (location.pathname === "/contact") {
                e.preventDefault();
                window.location.reload();
              }
            }}
          >
            CONTACT
          </Link>
        </nav>
        <div className="flex items-center opposite-logo gap-4 ml-auto">
          <Link
            className="flex items-center justify-start gap-1"
            to="favorites"
          >
            <div className={"carticon-container"}>
              <FavoriteBorderOutlinedIcon
                style={{
                  color: headerColor ? "#ffffff" : "#103954",
                  fontSize: "2rem",
                }}
                className={
                  " " + (headerColor ? "white-hover-text" : "blue-hover-text")
                }
              />
            </div>
          </Link>
          <Link className="flex items-center justify-start gap-1" to="profile">
            <div className="carticon-container">
              <AccountCircleOutlinedIcon
                style={{
                  color: headerColor ? "#ffffff" : "#103954",
                  fontSize: "2rem",
                }}
                className={
                  " " + (headerColor ? "white-hover-text" : "blue-hover-text")
                }
              />
            </div>
          </Link>
        </div>
        {isLoggedIn && (
          <ForceModal isVisible={isVisible}>
            <div className="flex justify-center items-center">
              <div className="bg-white p-8 rounded w-screen max-w-md">
                <h1 className="text-xl mb-3">Your session has expired</h1>
                <p className="mb-4">Please login again to continue</p>
                <LogoutButton onClick={hideModal} />
              </div>
            </div>
          </ForceModal>
        )}
      </header>
    );
  }
}

export default Header;
