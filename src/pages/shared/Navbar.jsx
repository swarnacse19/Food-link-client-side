import React from "react";
import { Link, NavLink } from "react-router";
import FoodLinkLogo from "./FoodLinkLogo";

function Navbar() {
  //   const {user, logout} = useAuth();

  //   const handleLogout = () =>{
  //     logout().then(() =>{
  //       console.log("logout successfully");
  //     }).catch(error =>{
  //       console.log(error.message);
  //     })
  //   }
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services">All Donations</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Dashboard</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 font-medium shadow-sm py-4 px-10">
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
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
        <Link to="/login" className="btn bg-white border-2 border-[#FF8C42]">
            Sign In
          </Link>
        {/* {user ? (
          <button onClick={handleLogout} className="btn bg-white border-black">
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn bg-white border-black">
            Sign In
          </Link>
        )} */}
      </div>
    </div>
  );
}

export default Navbar;
