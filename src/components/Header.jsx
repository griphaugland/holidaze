import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "/logo.svg?url";
import LogoBlue from "/logoBlue.svg?url";
import LogoutButton from "./buttons/LogoutButton";
import {
  useErrorGeneral,
  useErrorVenues,
  useErrorProfiles,
} from "./hooks/useErrorNavigation";
import { useGeneral } from "../store";
import ProfileButton from "./buttons/ProfileButton";
import NotLoggedInButton from "./buttons/NotLoggedInButton";

const navVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.0 } },
  exit: { opacity: 1 },
};

const navButtonVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

function Header() {
  useErrorProfiles();
  useErrorGeneral();
  useErrorVenues();

  const [headerColor, setHeaderColor] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { isLoggedIn, user } = useGeneral();
  const location = useLocation();

  useEffect(() => {
    const checkScrollAndPath = () => {
      if (window.scrollY > 40 || location.pathname !== "/") {
        setHeaderColor(false);
      } else {
        setHeaderColor(true);
      }
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", checkScrollAndPath);
    }

    checkScrollAndPath();

    return () => {
      window.removeEventListener("scroll", checkScrollAndPath);
      if (location.pathname !== "/") {
        setHeaderColor(false);
      }
    };
  }, [location]);

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
              loading="lazy"
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
              name="click to view favorites"
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
              name="click to activate mobile menu"
              onClick={() => {
                setToggle(!toggle);
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
        <AnimatePresence>
          {toggle && (
            <motion.nav
              initial="hidden"
              animate="visible"
              exit={{ duration: 0 }}
              variants={navVariants}
              transition={{ duration: 0.1 }}
              className="text-xl font-bold flex flex-col my-4 animateMenu"
            >
              <motion.div variants={navButtonVariants}>
                <Link
                  className="flex nav-item items-center justify-center shadow-lg gap-2 min-w-36"
                  to=""
                  name="click to go to home page"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <HomeIcon />
                  Home
                </Link>
              </motion.div>
              <motion.div variants={navButtonVariants}>
                <Link
                  name="click to go to venues page"
                  className="flex nav-item items-center justify-center shadow-lg gap-2 min-w-36"
                  to="venues"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <BusinessIcon />
                  Venues
                </Link>
              </motion.div>
              <motion.div variants={navButtonVariants}>
                <Link
                  name="click to go to bookings page"
                  className="flex nav-item items-center justify-center shadow-lg gap-2 min-w-36"
                  to={isLoggedIn ? "my-bookings" : "login"}
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <BookmarksIcon />
                  Bookings
                </Link>
              </motion.div>
              {isLoggedIn ? (
                <>
                  {user && user.data.venueManager && (
                    <motion.div variants={navButtonVariants}>
                      <Link
                        name="click to go to your dashboard to manage venues and bookings"
                        className="flex nav-item items-center justify-center shadow-lg gap-2 min-w-36"
                        to="dashboard"
                        onClick={() => {
                          setToggle(!toggle);
                        }}
                      >
                        <DashboardIcon />
                        Dashboard
                      </Link>
                    </motion.div>
                  )}
                  <motion.div variants={navButtonVariants}>
                    <Link
                      name="click to go to profile page"
                      className="flex nav-item items-center justify-center shadow-lg gap-2 min-w-36"
                      to="profile"
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      <AccountCircleOutlinedIcon />
                      Profile
                    </Link>
                  </motion.div>
                  <motion.div variants={navButtonVariants}>
                    <LogoutButton
                      size="navigation"
                      className="logout shadow-lg"
                    />
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div variants={navButtonVariants}>
                    <Link
                      name="click to go to login page"
                      className="flex nav-item items-center justify-center gap-2 shadow-lg min-w-36"
                      to="login"
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      <AccountCircleOutlinedIcon />
                      Log in
                    </Link>
                  </motion.div>
                  <motion.div variants={navButtonVariants}>
                    <Link
                      name="click to go to register page"
                      className="flex nav-item items-center justify-center shadow-lg gap-2 min-w-36"
                      to="register"
                      onClick={() => {
                        setToggle(!toggle);
                      }}
                    >
                      <AppRegistrationOutlinedIcon />
                      Register
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
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
          name="click to go to home page"
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
            loading="lazy"
            src={headerColor ? Logo : LogoBlue}
            alt="holidaze logo"
          />
        </Link>
        <nav className="text-l flex poppins-regular text-sm tracking-widest flex-row gap-8">
          <Link
            name="click to go to home page"
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
            name="click to go to venues page"
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
          <NotLoggedInButton text="BOOKINGS" headerColor={headerColor} />
        </nav>
        <div className="flex items-center opposite-logo gap-4 ml-auto">
          <Link
            name="click to go to favorites page"
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
