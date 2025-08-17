import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../Loading/Loading";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import image from "../../assets/bg.png";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  const [pickupTime, setPickupTime] = useState("");
  const [requestDesc, setRequestDesc] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [reviewDesc, setReviewDesc] = useState("");
  const [rating, setRating] = useState("");

  const {
    data: donation,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donation-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/donations/${id}`);
      return res.data;
    },
  });

  const { data: assignedRequest = {} } = useQuery({
    queryKey: ["assigned-request", id, user?.email],
    enabled: role === "charity" && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/${id}?email=${user.email}`
      );
      return res.data;
    },
  });

  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/reviews/${id}`);
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
      setShowRequestModal(false);
      refetch();
    },
    onError: () => toast.error("Failed to request donation."),
  });

  const confirmPickup = useMutation({
    mutationFn: async () => {
      await axiosSecure.patch(`/donation-requests/${id}`, {
        status: "Picked Up",
        charityEmail: user.email,
      });
    },
    onSuccess: () => {
      toast.success("Donation marked as picked up");
      refetch();
    },
    onError: () => toast.error("Failed to confirm pickup."),
  });

  const addReview = useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/reviews", {
        donationId: id,
        reviewerName: user.displayName,
        reviewerEmail: user.email,
        description: reviewDesc,
        rating: parseInt(rating),
      });
    },
    onSuccess: () => {
      toast.success("Review submitted!");
      setShowReviewModal(false);
      setReviewDesc("");
      setRating("");
      refetchReviews();
    },
    onError: () => toast.error("Failed to submit review."),
  });

  if (isLoading || roleLoading) return <Loading />;

  const formatWindow = () => {
    const [sh, sm] = donation.pickupWindow.start.split(":").map(Number);
    const [eh, em] = donation.pickupWindow.end.split(":").map(Number);
    const start = `${sh % 12 || 12}.${sm.toString().padStart(2, "0")} ${
      sh >= 12 ? "PM" : "AM"
    }`;
    const end = `${eh % 12 || 12}.${em.toString().padStart(2, "0")} ${
      eh >= 12 ? "PM" : "AM"
    }`;
    return `${start} - ${end}`;
  };

  return (
    <div
      className="py-10"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.3), rgba(254, 163, 1, 0.1) 100%), url(${image})`,
      }}
    >
      <div className="max-w-2xl mx-auto p-3 bg-orange-100 rounded-xl shadow-lg">
        <img
          src={donation.imageUrl}
          alt={donation.title}
          className="w-full h-64 object-cover rounded"
        />
        <h2 className="text-2xl text-orange-600 font-bold mt-4">{donation.title}</h2>
        <p className="text-sm">Food Type: {donation.foodType}</p>
        <p className="text-sm">Quantity: {donation.quantity}</p>
        <p className="text-sm">Pickup Window: {formatWindow()}</p>
        <p className="text-sm">
          Restaurant: {donation.restaurantName} ({donation.location})
        </p>
        <p className="text-sm font-semibold mt-2 text-neutral-600">
          Status: {donation.dStatus}
        </p>

        {user && (role === "user" || role === "charity") && (
          <button
            className="mt-4 mr-2 btn bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => addToFavorites.mutate()}
          >
            Save to Favorites
          </button>
        )}

        {role === "charity" &&
          donation.dStatus !== "Assigned" &&
          donation.dStatus !== "Picked Up" &&
          (assignedRequest?._id ? (
            <button
              className="btn mt-4 bg-gray-400 text-black cursor-not-allowed"
              disabled
            >
              Already Requested
            </button>
          ) : (
            <button
              className="btn mt-4 bg-orange-600 text-white"
              onClick={() => setShowRequestModal(true)}
            >
              Request Donation
            </button>
          ))}

        {role === "charity" &&
          assignedRequest?.charityEmail === user.email &&
          assignedRequest.status === "Accepted" && (
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
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="border p-2 rounded mb-2">
                <p className="font-semibold">{rev.reviewerName}</p>
                <p className="text-sm">Rating: {rev.rating} / 5</p>
                <p className="text-sm">{rev.description}</p>
              </div>
            ))
          )}
          {user && (role === "user" || role === "charity") && (
            <button
              className="px-4 py-1 border border-orange-500 rounded-sm font-semibold hover:bg-orange-200 mt-3"
              onClick={() => setShowReviewModal(true)}
            >
              Add Review
            </button>
          )}
        </div>

        {/* Request Modal */}
        {showRequestModal && (
          <dialog className="modal modal-open">
            <div className="modal-box max-w-2xl">
              <h3 className="text-lg font-bold mb-4">Request Donation</h3>
              <input
                type="text"
                readOnly
                value={donation.title}
                className="input input-bordered w-full mb-2"
              />
              <input
                type="text"
                readOnly
                value={donation.restaurantName}
                className="input input-bordered w-full mb-2"
              />
              <input
                type="text"
                readOnly
                value={user.displayName}
                className="input input-bordered w-full mb-2"
              />
              <input
                type="email"
                readOnly
                value={user.email}
                className="input input-bordered w-full mb-2"
              />
              <textarea
                placeholder="Request description"
                className="textarea textarea-bordered w-full mb-2"
                value={requestDesc}
                onChange={(e) => setRequestDesc(e.target.value)}
              />
              <label>Pickup Time</label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="input input-bordered w-full mb-2"
              />
              <div className="flex justify-between">
                <button
                  className="btn bg-orange-500 text-white"
                  onClick={() => requestDonation.mutate()}
                >
                  Submit
                </button>
                <button
                  className="btn"
                  onClick={() => setShowRequestModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        )}

        {/* Review Modal */}
        {showReviewModal && (
          <dialog className="modal modal-open">
            <div className="modal-box max-w-2xl">
              <h3 className="text-lg font-bold mb-4">Add Review</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addReview.mutate();
                }}
              >
                <input
                  type="text"
                  readOnly
                  value={user.displayName}
                  className="input input-bordered w-full mb-2"
                />
                <input
                  type="email"
                  readOnly
                  value={user.email}
                  className="input input-bordered w-full mb-2"
                />
                <textarea
                  required
                  placeholder="Your review..."
                  className="textarea textarea-bordered w-full mb-2"
                  value={reviewDesc}
                  onChange={(e) => setReviewDesc(e.target.value)}
                />
                <input
                  type="number"
                  required
                  min={1}
                  max={5}
                  placeholder="Rating (1-5)"
                  className="input input-bordered w-full mb-2"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                <div className="flex justify-between">
                  <button type="submit" className="btn bg-blue-600 text-white">
                    Submit Review
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setShowReviewModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default DonationDetails;
