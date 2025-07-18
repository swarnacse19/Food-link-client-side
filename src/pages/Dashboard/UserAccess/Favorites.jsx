import { useQuery, useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Loading/Loading";

const Favorites = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: favorites = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-favorites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user.email}`);
      return res.data;
    },
  });

  const deleteFavorite = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/favorites/${id}`);
    },
    onSuccess: () => {
      toast.success("Removed from favorites");
      refetch();
    },
    onError: () => toast.error("Failed to remove"),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6">My Favorite Donations</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div key={fav._id} className="card bg-white shadow-lg p-4 rounded-xl">
              <img
                src={fav.imageUrl}
                alt={fav.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold">{fav.title}</h3>
              <p className="text-sm">{fav.restaurantName} - {fav.location}</p>
              <p className="text-sm">Quantity: {fav.quantity}</p>
              <p className="text-sm text-neutral-600 font-medium">Status: {fav.dStatus}</p>
              <div className="mt-4 flex gap-2">
                <Link to={`/donation-details/${fav._id}`} className="btn btn-sm bg-blue-600 text-white">
                  Details
                </Link>
                <button
                  className="btn btn-sm bg-red-600 text-white"
                  onClick={() => deleteFavorite.mutate(fav.favoriteId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000}></ToastContainer>
    </div>
  );
};

export default Favorites;
