import { useQuery, useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyPickups = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: pickups = [], refetch } = useQuery({
    queryKey: ["my-pickups", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-donation-requests?email=${user.email}`);
      // Only return accepted ones from the backend response
      return res.data.filter((r) => r.status === "Accepted");
    },
  });

  const confirmPickup = useMutation({
    mutationFn: async (donationId) =>
      await axiosSecure.patch(`/donation-requests/${donationId}`, {
        status: "Picked Up",
        charityEmail: user.email,
      }),
    onSuccess: () => {
      toast.success("Pickup confirmed!");
      refetch(); // remove it from list after pickup
    },
    onError: () => toast.error("Failed to confirm pickup"),
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Pickups</h2>
      {pickups.length === 0 ? (
        <p>No pickups available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pickups.map((req) => (
            <div key={req._id} className="border rounded-lg p-4 shadow">
              <p><strong>Donation:</strong> {req.donationTitle}</p>
              <p><strong>Restaurant:</strong> {req.restaurantName}</p>
              <p><strong>Pickup Time:</strong> {req.pickupTime}</p>
              <p><strong>Status:</strong> <span className="font-medium">{req.status}</span></p>

              <button
                className="btn bg-green-600 text-white btn-sm mt-3"
                onClick={() => {
                  Swal.fire({
                    title: "Confirm Pickup?",
                    text: "Once confirmed, this will mark the donation as picked up.",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Yes, confirm it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      confirmPickup.mutate(req.donationId);
                    }
                  });
                }}
              >
                Confirm Pickup
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default MyPickups;
