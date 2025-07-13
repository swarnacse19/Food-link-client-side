import React from "react";
import fork from "../../assets/fork.svg";
import { Link } from "react-router";

function FoodLinkLogo() {
  return (
    <Link>
      <div className="flex items-center">
        <img className="w-8" src={fork} alt="" />
        <h1 className="text-3xl text-[#FF8C42] font-bold">FoodLink</h1>
      </div>
    </Link>
  );
}

export default FoodLinkLogo;
