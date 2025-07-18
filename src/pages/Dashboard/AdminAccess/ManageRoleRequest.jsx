import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../../Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function ManageRoleRequest() {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["charity-role-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charity-role-requests");
      return res.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/charity-role-request/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: (_, { status }) => {
      toast.success(`Request ${status.toLowerCase()} successfully.`);
      refetch();
    },
    onError: () => toast.error("Failed to update status"),
  });

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Manage Charity Role Requests</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Mission</th>
            <th>Transaction ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>{req.organization}</td>
              <td>{req.mission}</td>
              <td className="text-sm">{req.transactionId}</td>
              <td>
                <span
                  className={`badge text-white ${
                    req.status === "Approved"
                      ? "bg-green-500"
                      : req.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {req.status}
                </span>
              </td>
              <td>
                {req.status === "Pending" && (
                  <div className="flex gap-2">
                    <button
                      className="btn btn-xs bg-green-500 text-white"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: req._id,
                          status: "Approved",
                        })
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-xs bg-red-500 text-white"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: req._id,
                          status: "Rejected",
                        })
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-right" autoClose={5000}></ToastContainer>
    </div>
  );
}

export default ManageRoleRequest;
