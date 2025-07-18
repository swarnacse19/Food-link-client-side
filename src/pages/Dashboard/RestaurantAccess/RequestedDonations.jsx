import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../Loading/Loading";

const RequestedDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["restaurant-requests", user?.displayName],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/restaurant-donation-requests?restaurantName=${user.displayName}`
      );
      return res.data;
    },
    enabled: !!user?.displayName,
  });

  const acceptMutation = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.patch(`/donation-requests/accept/${id}`),
    onSuccess: () => {
      Swal.fire("Accepted!", "Request accepted and others rejected.", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to accept the request.", "error");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.patch(`/donation-requests/reject/${id}`),
    onSuccess: () => {
      Swal.fire("Rejected!", "Request has been rejected.", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to reject the request.", "error");
    },
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Requested Donations</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Donation Title</th>
              <th>Charity Name</th>
              <th>Charity Email</th>
              <th>Description</th>
              <th>Pickup Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id}>
                <td>{r.donationTitle}</td>
                <td>{r.charityName}</td>
                <td>{r.charityEmail}</td>
                <td>{r.description}</td>
                <td>{r.pickupTime}</td>
                <td className="font-semibold">{r.status}</td>
                <td className="flex flex-col gap-1">
                  {r.status === "Pending" ? (
                    <>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => acceptMutation.mutate(r._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => rejectMutation.mutate(r._id)}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">Handled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedDonations;
