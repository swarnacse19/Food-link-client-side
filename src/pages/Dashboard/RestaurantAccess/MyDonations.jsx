import React from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../../Loading/Loading";

function MyDonations() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: donations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?email=${user.email}`);
      return res.data;
    },
  });

  const { mutateAsync: deleteDonation } = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/donations/${id}`),
    onSuccess: () => refetch(),
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteDonation(id);
        Swal.fire("Deleted!", "Your donation has been removed.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete donation.", "error");
      }
    }
  };

  const handleUpdateRedirect = (donation) => {
    navigate(`/dashboard/edit-donation/${donation._id}`, { state: { donation } });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold mb-4">My Donations</h2>

      {donations.map((donation) => (
        <div key={donation._id} className="card shadow p-4 border font-medium text-neutral-500">
          <img
            src={donation.imageUrl}
            alt={donation.title}
            className="h-64 object-cover rounded mb-4"
          />
          <h3 className="text-2xl text-black font-semibold">{donation.title}</h3>
          <p>Food Type: {donation.foodType}</p>
          <p>Quantity: {donation.quantity}</p>
          <p>Restaurant: {donation.restaurantName}</p>
          <p>
            Status: <span className="font-bold">{donation.status}</span>
          </p>
          <div className="mt-3 flex gap-4">
            {donation.status !== "Rejected" && (
              <button
                onClick={() => handleUpdateRedirect(donation)}
                className="btn bg-green-700 text-white"
              >
                Update
              </button>
            )}
            <button
              onClick={() => handleDelete(donation._id)}
              className="btn bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyDonations;
