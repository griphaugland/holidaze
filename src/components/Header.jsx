import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Logo from "/logo.svg?url";
import LogoBlue from "/logoBlue.svg?url";
import LogoutButton from "./buttons/LogoutButton";
import {
  useErrorGeneral,
  useErrorVenues,
  useErrorProfiles,
} from "../components/useErrorNavigation";
import { useGeneral } from "../store";
import ProfileButton from "./buttons/ProfileButton";
import NotLoggedInButton from "./buttons/NotLoggedInButton";

function Header() {
  useErrorProfiles();
  useErrorGeneral();
  useErrorVenues();

  const [headerColor, setHeaderColor] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { isLoggedIn } = useGeneral();
  const location = useLocation();

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
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (toggle) {
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = `${scrollbarWidth}px`;
      document.querySelector("header").style.paddingRight = `${
        scrollbarWidth + 15
      }px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.marginRight = `0px`;
      document.querySelector("header").style.paddingRight = `1rem`;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              to={isLoggedIn ? "my-bookings" : "login"}
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              Bookings
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  className="flex items-center justify-start gap-1 min-w-36"
                  to="profile"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  Profile
                </Link>
                <div className=" flex items-center justify-center gap-1 min-w-screen">
                  <LogoutButton size="navigation" />
                </div>
              </>
            ) : (
              <>
                <Link
                  className="flex items-center justify-start gap-1 min-w-36"
                  to="login"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  Log in
                </Link>
                <Link
                  className="flex items-center justify-start gap-1 min-w-36"
                  to="register"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  Register
                </Link>
              </>
            )}
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
          <NotLoggedInButton text="BOOKING" headerColor={headerColor} />
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
          <ProfileButton headerColor={headerColor} />
        </div>
      </header>
    );
  }
}

export default Header;
