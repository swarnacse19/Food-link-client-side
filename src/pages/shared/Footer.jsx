import React from "react";
import { FaTwitter, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-[#FF8C42] text-black text-[14px] px-16 py-14">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:flex-row justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-3">FoodLink</h1>
          <div className="flex gap-2 items-center mb-4">
            <FaPhoneAlt />
            <p>Cell/WhatsApp: +880 18243-11959</p>
          </div>
          <div className="flex gap-2 items-center">
            <MdEmail />
            <p>Email: swarna.bu11@gmail.com</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Important Links</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="">
              <IoLogoFacebook size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © 2025 FoodLink. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
