import { useQuery, useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Loading/Loading";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      return res.data;
    },
  });

  const deleteReview = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      toast.success("Review deleted.");
      refetch();
    },
    onError: () => toast.error("Failed to delete review."),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        reviews.map((rev) => (
          <div
            key={rev._id}
            className="bg-white shadow-md rounded p-4 mb-4 border"
          >
            <h3 className="text-lg font-semibold">{rev.donationTitle}</h3>
            <p className="text-sm text-gray-600">
              Restaurant: {rev.restaurantName}
            </p>
            <p className="text-sm text-gray-600">
              Rating: {rev.rating} / 5
            </p>
            <p className="text-sm mt-2">{rev.description}</p>
            <button
              className="btn btn-sm bg-red-600 text-white mt-3"
              onClick={() => deleteReview.mutate(rev._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
      <ToastContainer position="top-right" autoClose={5000}></ToastContainer>
    </div>
  );
};

export default MyReviews;
