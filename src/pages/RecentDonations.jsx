import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../hooks/useAxios";
import Loading from "../Loading/Loading";

const RecentDonations = () => {
    const axiosInstance = useAxios();
  const { data: RecentDonations = [], isLoading } = useQuery({
    queryKey: ["RecentDonations"],
    queryFn: async () => {
      const res = await axiosInstance.get("/donations/recent");
      return res.data;
    },
  });

  return (
    <section className="py-20 px-4 md:px-10 mx-auto">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-14 text-orange-500 text-center"> Recent Donations</h2>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
          {RecentDonations.map((donation) => (
            <div
              key={donation._id}
              className="rounded-xl overflow-hidden shadow-md bg-orange-100 border border-gray-200"
            >
              <img
                src={donation.imageUrl}
                alt={donation.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold">{donation.title}</h3>
                <p className="text-xs">Type: {donation.foodType}</p>
                <p className="text-xs">Restaurant: {donation.restaurantName}</p>
                <p className="text-xs text-gray-600">
                  Location: {donation.location}
                </p>
                <p
                  className={`text-xs font-semibold ${
                    donation.dStatus === "Available"
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  Status: {donation.dStatus}
                </p>
                <Link
                  to={`/donation-details/${donation._id}`}
                  className="btn px-5 mt-2 bg-orange-500 text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentDonations;
