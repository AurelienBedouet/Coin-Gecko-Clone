import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(prevNav => !prevNav);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      {/* START NAVBAR */}
      <nav className="border-b fixed top-0 left-0 h-20 w-full z-20 bg-primary shadow-lg">
        <div className="max-w-[1140px] w-[95%] mx-auto px-2 md:px-4 lg:px-8 flex items-center justify-between h-20 font-bold">
          {/* Logo */}
          <Link to="/">
            <p className="text-2xl">CoinWatch</p>
          </Link>

          {/* Dark/Light Theme Toggle action */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Sign In / Sign Up / Sign Out Buttons */}

          {/* If user is signed in, display this: */}
          {user?.email ? (
            <div>
              <Link to="/account" className="p-4 mr-2">
                Account
              </Link>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          ) : (
            // If no user signed in, display this:
            <div className="hidden md:block">
              <Link to="/signin" className="p-4 hover:text-accent">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Menu Icon */}
          <div
            onClick={handleNav}
            className="block md:hidden cursor-pointer z-10"
          >
            {nav ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
          </div>
        </div>
      </nav>
      {/* END NAVBAR */}

      {/* START MOBILE MENU */}
      <div
        className={
          nav
            ? "overflow-hidden md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[calc(100%-80px)] bg-primary ease-in duration-300 z-20"
            : "fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full p-4">
          <li onClick={handleNav} className="border-b py-6">
            <Link to="/">Home</Link>
          </li>
          <li onClick={handleNav} className="border-b py-6">
            <Link to="/account">Account</Link>
          </li>
          <li className="py-6">
            <ThemeToggle />
          </li>
        </ul>

        {!user?.email && (
          <div className="flex flex-col w-full p-4">
            <Link to="/signin">
              <button
                onClick={handleNav}
                className="w-full my-2 p-3 bg-primary text-primary border-secondary rounded-2xl shadow-xl"
              >
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button
                onClick={handleNav}
                className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
              >
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
      {/* END MOBILE MENU */}
    </>
  );
};

export default Navbar;
