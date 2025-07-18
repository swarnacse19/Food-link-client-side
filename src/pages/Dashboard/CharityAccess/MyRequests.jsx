import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["my-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-donation-requests?email=${user.email}`);
      return res.data;
    },
  });

  const cancelRequest = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/donation-requests/${id}`),
    onSuccess: () => {
      toast.success("Request cancelled");
      refetch();
    },
    onError: () => toast.error("Failed to cancel request"),
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Donation Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req) => (
            <div key={req._id} className="p-4 border rounded-lg shadow">
              <p><strong>Donation:</strong> {req.donationTitle}</p>
              <p><strong>Restaurant:</strong> {req.restaurantName}</p>
              <p><strong>Status:</strong> <span className="font-semibold">{req.status}</span></p>

              {req.status === "Pending" && (
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: "This will cancel your request.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Yes, cancel it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        cancelRequest.mutate(req._id);
                      }
                    });
                  }}
                  className="btn btn-sm bg-red-500 text-white mt-2"
                >
                  Cancel Request
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000}></ToastContainer>
    </div>
  );
};

export default MyRequests;
