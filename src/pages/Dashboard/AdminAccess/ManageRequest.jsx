import { useQuery, useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Loading/Loading";

const ManageRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch all donation requests
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests");
      return res.data;
    },
  });

  // Delete request mutation
  const deleteRequest = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/donation-requests/${id}`);
    },
    onSuccess: () => {
      toast.success("Request deleted");
      refetch();
    },
    onError: () => toast.error("Failed to delete request"),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Manage Donation Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No donation requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th>#</th>
                <th>Donation Title</th>
                <th>Charity Name</th>
                <th>Charity Email</th>
                <th>Description</th>
                <th>Pickup Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, idx) => (
                <tr key={req._id}>
                  <td>{idx + 1}</td>
                  <td>{req.donationTitle}</td>
                  <td>{req.charityName}</td>
                  <td>{req.charityEmail}</td>
                  <td>{req.description}</td>
                  <td>{req.pickupTime}</td>
                  <td>
                    <button
                      className="btn btn-sm bg-red-600 text-white"
                      onClick={() => deleteRequest.mutate(req._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000}></ToastContainer>
    </div>
  );
};

export default ManageRequest;
