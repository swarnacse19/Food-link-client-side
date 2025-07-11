import React from "react";
import { Outlet } from "react-router";
import auth from "../assets/auth.jpg";
import FoodLinkLogo from "../pages/shared/FoodLinkLogo";

function AuthLayout() {
  return (
    <div className="bg-white flex items-center justify-center">
      <div className="flex flex-col lg:flex-row-reverse w-full overflow-hidden">
        <div className="bg-[#FAFDF0] flex-1 flex items-center justify-center p-4">
          <img
            src={auth}
            alt="Authentication Illustration"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="flex-1 p-12 ">
          <FoodLinkLogo></FoodLinkLogo>
          <div className="flex flex-col items-center justify-center mt-5">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
