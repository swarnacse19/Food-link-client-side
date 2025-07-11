import React from 'react';
import fork from "../../assets/fork.svg";

function FoodLinkLogo() {
  return (
    <div className='flex items-center'>
      <img className='w-10' src={fork} alt="" />
      <h1 className='text-3xl text-[#FF8C42] font-bold'>FoodLink</h1>
    </div>
  );
}

export default FoodLinkLogo;