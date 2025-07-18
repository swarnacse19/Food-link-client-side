import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../Loading/Loading";
import { toast } from "react-toastify";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();
  const [pickupTime, setPickupTime] = useState("");
  const [requestDesc, setRequestDesc] = useState("");

  const { data: donation, isLoading, refetch } = useQuery({
    queryKey: ["donation-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

  const { data: assignedRequest = {} } = useQuery({
    queryKey: ["assigned-request", id, user?.email],
    enabled: role === "charity" && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
  });

  const addToFavorites = useMutation({
    mutationFn: async () => {
      await axiosSecure.post("/favorites", {
        email: user.email,
        name: user.displayName,
        donationId: id,
      });
    },
    onSuccess: () => toast.success("Added to favorites!"),
    onError: () => toast.error("Failed to add to favorites."),
  });

  const requestDonation = useMutation({
    mutationFn: async () => {
      await axiosSecure.post("/donation-requests", {
        donationId: id,
        restaurantName: donation.restaurantName,
        donationTitle: donation.title,
        charityName: user.displayName,
        charityEmail: user.email,
        description: requestDesc,
        pickupTime,
        status: "Pending",
      });
    },
    onSuccess: () => {
      toast.success("Request submitted.");
      refetch();
    },
    onError: () => toast.error("Failed to request donation."),
  });

  const confirmPickup = useMutation({
    mutationFn: async () => {
      await axiosSecure.patch(`/donations/${id}/pickup`, {
        pickedUpBy: user.email,
      });
    },
    onSuccess: () => {
      toast.success("Donation marked as picked up");
      refetch();
    },
    onError: () => toast.error("Failed to confirm pickup."),
  });

  if (isLoading || roleLoading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg">
      <img
        src={donation.imageUrl}
        alt={donation.title}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-2xl font-bold mt-4">{donation.title}</h2>
      <p className="text-gray-700">{donation.description}</p>
      <p className="text-sm mt-2">Food Type: {donation.foodType}</p>
      <p className="text-sm">Quantity: {donation.quantity}</p>
      <p className="text-sm">Pickup Window: {donation.pickupTimeWindow}</p>
      <p className="text-sm">Restaurant: {donation.restaurantName} ({donation.location})</p>
      <p className="text-sm font-semibold mt-2 text-blue-600">
        Status: {donation.dStatus}
      </p>

      {(role === "user" || role === "charity") && (
        <button
          className="btn bg-green-500 text-white mt-4 mr-2"
          onClick={() => addToFavorites.mutate()}
        >
          Save to Favorites
        </button>
      )}

      {role === "charity" && donation.dStatus === "Available" && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Request This Donation</h3>
          <input
            type="text"
            value={donation.title}
            readOnly
            className="input input-bordered w-full mb-2"
          />
          <input
            type="text"
            value={donation.restaurantName}
            readOnly
            className="input input-bordered w-full mb-2"
          />
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full mb-2"
          />
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full mb-2"
          />
          <textarea
            placeholder="Request description"
            className="textarea textarea-bordered w-full mb-2"
            value={requestDesc}
            onChange={(e) => setRequestDesc(e.target.value)}
          />
          <input
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="input input-bordered w-full mb-2"
          />
          <button
            className="btn bg-orange-500 text-white w-full"
            onClick={() => requestDonation.mutate()}
          >
            Submit Request
          </button>
        </div>
      )}

      {role === "charity" && assignedRequest?.assignedTo === user.email && donation.dStatus === "Accepted" && (
        <button
          className="btn mt-4 bg-blue-600 text-white"
          onClick={() => confirmPickup.mutate()}
        >
          Confirm Pickup
        </button>
      )}

      {/* Review Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Reviews</h3>
        {/* Render reviews (you can fetch from `/reviews/:donationId`) */}
        {/* Add Review Button if user or charity */}
        {(role === "user" || role === "charity") && (
          <button className="btn bg-gray-600 text-white">Add Review</button>
        )}
      </div>
    </div>
  );
};

export default DonationDetails;
