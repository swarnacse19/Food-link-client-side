import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";

const AllDonations = () => {
  const axiosInstance = useAxios();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["allVerifiedDonations"],
    queryFn: async () => {
      const res = await axiosInstance.get("/donations/verified");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">All Donations</h2>

      {donations.length === 0 ? (
        <p className="text-center text-gray-500">No donations available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-xl shadow-md border overflow-hidden"
            >
              <img
                src={donation.imageUrl}
                alt={donation.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold">{donation.title}</h3>
                <p className="text-sm">Type: {donation.foodType}</p>
                <p className="text-sm font-semibold">
                  Quantity: {donation.quantity}
                </p>
                <p className="text-sm">
                  <strong>Restaurant:</strong> {donation.restaurantName}
                </p>
                {donation.charityName && (
                  <p className="text-sm">
                    <strong>Assigned to:</strong> {donation.charityName}
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {donation.location}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    donation.dStatus === "Available"
                      ? "text-green-600"
                      : donation.dStatus === "Requested"
                      ? "text-orange-500"
                      : "text-blue-600"
                  }`}
                >
                  Status: {donation.dStatus}
                </p>

                <Link
                  to={`/donation-details/${donation._id}`}
                  className="btn bg-orange-500 text-white mt-3 w-full"
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

export default AllDonations;
