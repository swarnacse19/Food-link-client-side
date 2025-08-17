import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading/Loading";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import image from "../../assets/bg.png";

const AllDonations = () => {
  const axiosInstance = useAxios();

  const [inputValue, setInputValue] = useState(""); // For typing in input
  const [locationSearch, setLocationSearch] = useState(""); // Actual query trigger
  const [sortBy, setSortBy] = useState(""); // Sort option

  const {
    data: donations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allVerifiedDonations", locationSearch, sortBy],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (locationSearch) params.append("location", locationSearch);
      if (sortBy) params.append("sort", sortBy);
      const res = await axiosInstance.get(
        `/donations/verified?${params.toString()}`
      );
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setLocationSearch(inputValue);
  };

  if (isLoading) return <Loading />;

  return (
    <section className="py-10 px-4 md:px-10 mx-auto" style={{ backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.3), rgba(254, 163, 1, 0.1) 100%), url(${image})` }}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-orange-500 font-bold text-center mb-6">All Donations</h2>

      {/* Search and Sort Controls */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center"
      >
        <input
          type="text"
          placeholder="Search by location"
          className="input input-bordered w-full md:w-1/3"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <select
          className="select select-bordered w-full md:w-1/4"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="quantity">Quantity</option>
          <option value="pickupTime">Pickup Time</option>
        </select>
        <button type="submit" className="btn bg-orange-500 text-white">
          Search
        </button>
      </form>

      {/* Donations Grid */}
      {donations.length === 0 ? (
        <p className="text-center text-gray-500">No donations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-orange-50 border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={donation.imageUrl}
                alt={donation.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <div className="space-y-2 flex-grow">
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
                </div>

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
