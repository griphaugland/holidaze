import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Logo from "/logo.svg?url";
import LogoBlue from "/logoBlue.svg?url";
import { useVenues } from "../store";

function Header() {
  const [headerColor, setHeaderColor] = useState(true);
  const [logoColor, setLogoColor] = useState();
  const [mobile, setMobile] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [animate, setAnimate] = useState(false);
  const cart = useVenues((state) => state.favorites);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setHeaderColor(false);
    } else {
      setHeaderColor(true);
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setHeaderColor(false);
    }
    if (headerColor) {
      setLogoColor(true);
    } else {
      setLogoColor(false);
    }
  }, []);

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
          "top-0 w-full sticky p-4 " +
          (headerColor ? "bg-transparent" : "bg-white")
        }
      >
        <div className="flex justify-between">
          <Link to="" className=" no-hover-effect">
            <img src={logoColor ? Logo : LogoBlue} alt="holidaze logo" />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              className="carticon-container"
              onClick={() => {
                setToggle(false);
              }}
              to="cart"
            >
              <FavoriteBorderOutlinedIcon />
            </Link>
            <button
              onClick={() => {
                setToggle(!toggle);
                setAnimate(!toggle);
              }}
              className="text-2xl font-bold"
            >
              {toggle ? (
                <CloseIcon style={{ fontSize: "2rem" }} />
              ) : (
                <MenuIcon style={{ fontSize: "2rem" }} />
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
        <Link to="" className=" mr-auto">
          <img src={logoColor ? Logo : LogoBlue} alt="holidaze logo" />
        </Link>
        <nav className="text-l flex flex-row gap-6">
          <Link className="flex items-center justify-start gap-1" to="">
            Home
          </Link>
          <Link className="flex items-center justify-start gap-1" to="venues">
            Venues
          </Link>
          <Link className="flex items-center justify-start gap-1" to="contact">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4 ml-auto">
          <Link className="flex items-center justify-start gap-1" to="cart">
            <div className="carticon-container">
              <FavoriteBorderOutlinedIcon />
            </div>
          </Link>
          <Link className="flex items-center justify-start gap-1" to="cart">
            <div className="carticon-container">
              <AccountCircleOutlinedIcon />
            </div>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
