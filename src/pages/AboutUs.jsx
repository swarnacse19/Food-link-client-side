import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaUtensils, FaHeart, FaGlobe } from "react-icons/fa";
import image from "../assets/bg.png";

const AboutUs = () => {
  return (
    <div style={{ backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.3), rgba(254, 163, 1, 0.1) 100%), url(${image})` }} className="min-h-screen">
      {/* Header Section */}
      <section className="py-16 px-6 text-center text-orange-600">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          About FoodLink
        </motion.h1>
        <p className="text-lg max-w-3xl mx-auto">
          FoodLink is a platform dedicated to reducing food waste and connecting
          restaurants, charities, and users for a greater social impact.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-md rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We aim to reduce food waste by connecting restaurants with local
            charities and individuals who can benefit from surplus food. Our
            platform empowers communities to fight hunger while promoting
            sustainability.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-md rounded-2xl p-8"
        >
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We envision a future where no edible food goes to waste, and every
            individual has access to nutritious meals. FoodLink strives to build
            a bridge between generosity and necessity.
          </p>
        </motion.div>
      </section>

      {/* Features / Impact */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-12">
          What We Do
        </h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }} style={{ background: `linear-gradient(to top,rgba(254, 163, 1, 0.2) ,rgba(255, 255, 255, 0.3) 100%), white` }}
            className="p-6 shadow rounded-2xl text-center"
          >
            <FaUsers className="mx-auto text-orange-500 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600 text-sm">
              Connecting Users, Charities, and Restaurants in one platform.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }} style={{ background: `linear-gradient(to top,rgba(254, 163, 1, 0.2) ,rgba(255, 255, 255, 0.3) 100%), white` }}
            className="p-6 shadow rounded-2xl text-center"
          >
            <FaUtensils className="mx-auto text-orange-500 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Donations</h3>
            <p className="text-gray-600 text-sm">
              Verified food donations available for charities and individuals.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }} style={{ background: `linear-gradient(to top,rgba(254, 163, 1, 0.2) ,rgba(255, 255, 255, 0.3) 100%), white` }}
            className="p-6 shadow rounded-2xl text-center"
          >
            <FaHeart className="mx-auto text-orange-500 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Impact</h3>
            <p className="text-gray-600 text-sm">
              Helping reduce hunger while minimizing food waste globally.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }} style={{ background: `linear-gradient(to top,rgba(254, 163, 1, 0.2) ,rgba(255, 255, 255, 0.3) 100%), white` }}
            className="p-6 shadow rounded-2xl text-center"
          >
            <FaGlobe className="mx-auto text-orange-500 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600 text-sm">
              Encouraging eco-friendly practices to save our planet.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
