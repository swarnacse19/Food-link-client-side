import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Loading/Loading";

const COLORS = ["#FF8C42", "#2B7A78", "#6A0572", "#FF3C38", "#4ECDC4"];

const DonationStats = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["donation-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Calculate total quantity by foodType
  const aggregated = donations.reduce((acc, curr) => {
    const type = curr.foodType;
    const quantity = parseFloat(curr.quantity) || 0;
    acc[type] = (acc[type] || 0) + quantity;
    return acc;
  }, {});

  const chartData = Object.entries(aggregated).map(([type, quantity]) => ({
    name: type,
    value: quantity,
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Donation Statistics</h2>

      {isLoading ? (
        <Loading></Loading>
      ) : chartData.length === 0 ? (
        <p>No donation data to display.</p>
      ) : (
        <div className="w-full h-[400px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default DonationStats;
