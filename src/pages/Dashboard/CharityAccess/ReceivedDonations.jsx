import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Loading/Loading";

const ReceivedDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [reviewDesc, setReviewDesc] = useState("");
  const [rating, setRating] = useState("");

  const { data: received = [], isLoading, refetch } = useQuery({
    queryKey: ["received-donations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-donation-requests?email=${user.email}`);
      return res.data.filter((r) => r.status === "Picked Up");
    },
  });

  const addReview = useMutation({
    mutationFn: async () => {
      await axiosSecure.post("/reviews", {
        donationId: selectedDonationId,
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
      refetch();
    },
    onError: () => toast.error("Failed to submit review."),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Received Donations</h2>
      {received.length === 0 ? (
        <p>No received donations yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {received.map((item) => (
            <div key={item._id} className="p-4 border rounded-lg shadow">
              <p><strong>Donation:</strong> {item.donationTitle}</p>
              <p><strong>Restaurant:</strong> {item.restaurantName}</p>
              <p><strong>Pickup Time:</strong> {item.pickupTime}</p>

              <button
                className="btn btn-sm bg-blue-600 text-white mt-3"
                onClick={() => {
                  setSelectedDonationId(item.donationId);
                  setShowReviewModal(true);
                }}
              >
                Add Review
              </button>
            </div>
          ))}
        </div>
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
      <ToastContainer position="top-right" autoClose={5000}></ToastContainer>
    </div>
  );
};

export default ReceivedDonations;
