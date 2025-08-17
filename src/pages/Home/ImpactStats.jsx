import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import CountUp from "react-countup";
import { FaAppleAlt, FaLeaf, FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";

const ImpactStats = () => {
  const axiosInstance = useAxios();

  const { data: verifiedDonations = [] } = useQuery({
    queryKey: ["impactStats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/donations/verified");
      return res.data;
    },
  });

  const totalQuantity = verifiedDonations.reduce((sum, d) => {
    const qty = parseFloat(d.quantity) || 0;
    return sum + qty;
  }, 0);

  const mealsSaved = Math.round(totalQuantity / 0.5);
  const co2Saved = Math.round(totalQuantity * 2.5);

  return (
    <section className="mx-auto py-20 px-4 md:px-10 text-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-14 text-orange-500">
        Our Impact
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Total Food Donated */}
        <motion.div whileHover={{ scale: 1.05 }} style={{ background: `linear-gradient(to top,rgba(254, 163, 1, 0.2) ,rgba(255, 255, 255, 0.3) 100%), white` }} className=" shadow p-6 rounded-lg flex flex-col items-center">
          <FaAppleAlt className="text-orange-500 text-5xl mb-3" />
          <h3 className="text-4xl font-bold">
            <CountUp end={totalQuantity} duration={2} /> kg
          </h3>
          <p className="text-lg mt-2 font-medium">Total Food Donated</p>
        </motion.div>

        {/* Meals Saved */}
        <motion.div whileHover={{ scale: 1.05 }} style={{ background: `linear-gradient(to top,rgba(254, 163, 1, 0.2) ,rgba(255, 255, 255, 0.3) 100%), white` }} className="shadow p-6 rounded-lg flex flex-col items-center">
          <FaUtensils className="text-orange-500 text-5xl mb-3" />
          <h3 className="text-4xl font-bold">
            <CountUp end={mealsSaved} duration={2} />
          </h3>
          <p className="text-lg mt-2 font-medium">Meals Saved</p>
        </motion.div>

        {/* CO2 Saved */}
        <motion.div whileHover={{ scale: 1.05 }} style={{ background: `linear-gradient(to top,rgba(254, 163, 1, 0.2) ,rgba(255, 255, 255, 0.3) 100%), white` }} className="shadow p-6 rounded-lg flex flex-col items-center">
          <FaLeaf className="text-orange-500 text-5xl mb-3" />
          <h3 className="text-4xl font-bold">
            <CountUp end={co2Saved} duration={2} /> kg
          </h3>
          <p className="text-lg mt-2 font-medium">CO₂ Emissions Prevented</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStats;
