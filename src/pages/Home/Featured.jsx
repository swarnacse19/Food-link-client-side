import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Loading/Loading";

const Featured = () => {
    const axiosInstance = useAxios();
  const { data: featured = [], isLoading } = useQuery({
    queryKey: ["featuredDonations"],
    queryFn: async () => {
      const res = await axiosInstance.get("/donations/featured");
      return res.data;
    },
  });

  return (
    <section className="my-16 px-4 max-w-11/12 mx-auto">
      <h2 className="text-3xl font-bold mb-9 text-center"> Featured Donations</h2>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
          {featured.map((donation) => (
            <div
              key={donation._id}
              className="rounded-xl overflow-hidden shadow-md border bg-white"
            >
              <img
                src={donation.imageUrl}
                alt={donation.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-2xl font-bold">{donation.title}</h3>
                <p className="text-lg">Type: {donation.foodType}</p>
                <p className="text-lg">Restaurant: {donation.restaurantName}</p>
                <p className="text-lg text-gray-600">
                  Location: {donation.location}
                </p>
                <p
                  className={`text-lg font-semibold ${
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

export default Featured;
