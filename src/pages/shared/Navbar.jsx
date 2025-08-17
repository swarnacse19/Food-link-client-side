import React from "react";
import { Link, NavLink } from "react-router";
import FoodLinkLogo from "./FoodLinkLogo";
import useAuth from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

function Navbar() {
  const { user, logout } = useAuth();
  //console.log(user);
  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logout Successfully!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allDonations">All Donations</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-orange-200 sticky top-0 left-0 w-full z-50 font-medium shadow-sm py-2 px-2 md:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <FoodLinkLogo></FoodLinkLogo>
      </div>
      <div className="navbar-end">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-3">{navItems}</ul>
        </div>
        {user ? (
          <>
            {/* Profile Picture */}
            {user.photoURL && (
              <div className="w-10 h-10 mr-2 rounded-full overflow-hidden border-2 border-[#FF8C42]">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* User Name */}
            {user.displayName && (
              <span className="text-xl mr-3 font-medium">
                {user.displayName.split(" ")[0]}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="w-24 px-4 py-1 rounded-sm font-semibold text-orange-700 hover:bg-orange-400 hover:text-white border-3 border-[#FF8C42]"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="w-24 px-4 py-1 rounded-sm font-semibold text-orange-700 hover:bg-orange-400 hover:text-white border-3 border-[#FF8C42]">
            Sign In
          </Link>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Navbar;
