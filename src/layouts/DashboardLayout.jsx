import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaUser,
  FaDonate,
  FaUsers,
  FaCheckCircle,
  FaTasks,
  FaStar,
  FaMoneyCheckAlt,
  FaBoxOpen,
  FaUserEdit,
  FaUserCheck,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";
import FoodLinkLogo from "../pages/shared/FoodLinkLogo";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-200 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <li className="mb-3">
            <FoodLinkLogo></FoodLinkLogo>
        </li>
          <li>
            <NavLink to="/">
              <FaHome className="mr-2" />
              Home
            </NavLink>
          </li>

          {!roleLoading && (
            <>
              {/* Shared for all */}
              <li>
                <NavLink to="/dashboard/profile">
                  <FaUser className="mr-2" />
                  My Profile
                </NavLink>
              </li>

              {/* Admin Nav */}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink to="/dashboard/manage-donations">
                      <FaBoxOpen className="mr-2" />
                      Manage Donations
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manage-users">
                      <FaUsers className="mr-2" />
                      Manage Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/role-requests">
                      <FaUserCheck className="mr-2" />
                      Manage Role Requests
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/all-requests">
                      <FaTasks className="mr-2" />
                      Manage Requests
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/featured-donations">
                      <FaStar className="mr-2" />
                      Feature Donations
                    </NavLink>
                  </li>
                </>
              )}

              {/* Charity Nav */}
              {role === "charity" && (
                <>
                  <li>
                    <NavLink to="/dashboard/my-requests">
                      <FaTasks className="mr-2" />
                      My Requests
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-pickups">
                      <FaBoxOpen className="mr-2" />
                      My Pickups
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/received-donations">
                      <FaCheckCircle className="mr-2" />
                      Received Donations
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/transactions">
                      <FaMoneyCheckAlt className="mr-2" />
                      Transaction History
                    </NavLink>
                  </li>
                </>
              )}

              {/* Restaurant Nav */}
              {role === "restaurant" && (
                <>
                  <li>
                    <NavLink to="/dashboard/add-donation">
                      <FaDonate className="mr-2" />
                      Add Donation
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-donations">
                      <FaBoxOpen className="mr-2" />
                      My Donations
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/requested-donations">
                      <FaTasks className="mr-2" />
                      Requested Donations
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/statistics">
                      <FaStar className="mr-2" />
                      Donation Stats
                    </NavLink>
                  </li>
                </>
              )}

              {/* User Nav */}
              {role === "user" && (
                <>
                  <li>
                    <NavLink to="/dashboard/request-charity-role">
                      <FaUserEdit className="mr-2" />
                      Request Charity Role
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/favorites">
                      <FaStar className="mr-2" />
                      Favorites
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-reviews">
                      <FaTasks className="mr-2" />
                      My Reviews
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/transactions">
                      <FaMoneyCheckAlt className="mr-2" />
                      Transaction History
                    </NavLink>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
