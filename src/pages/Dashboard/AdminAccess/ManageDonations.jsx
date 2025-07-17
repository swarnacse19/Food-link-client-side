import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../Loading/Loading";

const ManageDonations = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: donations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/all");
      return res.data;
    },
  });

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ id, status }) =>
      await axiosSecure.patch(`/donations/${id}/status`, { status }),
    onSuccess: () => refetch(),
  });

  const handleAction = async (id, action) => {
    const confirm = await Swal.fire({
      title: `Are you sure you want to ${action} this donation?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (confirm.isConfirmed) {
      try {
        await updateStatus({ id, status: action === "verify" ? "Verified" : "Rejected" });
        Swal.fire("Success", `Donation marked as ${action}`, "success");
      } catch (err) {
        Swal.fire("Error", "Failed to update status", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Donations</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Food Type</th>
                <th>Restaurant</th>
                <th>Email</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d._id}>
                  <td>{d.title}</td>
                  <td>{d.foodType}</td>
                  <td>{d.restaurantName}</td>
                  <td>{d.restaurantEmail}</td>
                  <td>{d.quantity}</td>
                  <td>{d.status || "Pending"}</td>
                  <td className="flex flex-col md:flex-row gap-1">
                    {d.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleAction(d._id, "verify")}
                          className="btn btn-xs btn-success"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleAction(d._id, "reject")}
                          className="btn btn-xs btn-error"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageDonations;
