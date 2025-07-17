import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import CountUp from "react-countup";

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
    <section className="bg-[#fef9f5] py-10 px-4 my-12 text-center">
      <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Total Food Donated */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-4xl font-bold text-orange-500">
            <CountUp end={totalQuantity} duration={2} /> kg
          </h3>
          <p className="text-lg mt-2 font-medium">Total Food Donated</p>
        </div>

        {/* Meals Saved */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-4xl font-bold text-green-600">
            <CountUp end={mealsSaved} duration={2} />
          </h3>
          <p className="text-lg mt-2 font-medium">Meals Saved</p>
        </div>

        {/* CO2 Saved */}
        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-4xl font-bold text-blue-600">
            <CountUp end={co2Saved} duration={2} /> kg
          </h3>
          <p className="text-lg mt-2 font-medium">CO₂ Emissions Prevented</p>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
