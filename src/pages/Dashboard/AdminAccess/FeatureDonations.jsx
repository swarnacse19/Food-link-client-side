import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../Loading/Loading";

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: verifiedDonations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["verify-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified");
      return res.data;
    },
  });

  const { mutateAsync: featureDonation } = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.patch(`/donations/${id}/feature`),
    onSuccess: () => refetch(),
  });

  const handleFeature = async (id) => {
    const confirm = await Swal.fire({
      title: "Feature this donation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Feature it",
    });

    if (confirm.isConfirmed) {
      try {
        await featureDonation(id);
        Swal.fire("Success", "Donation featured successfully", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to feature donation", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Feature Donations</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Food Type</th>
                <th>Restaurant</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {verifiedDonations.map((d) => (
                <tr key={d._id}>
                  <td>
                    <img
                      src={d.imageUrl}
                      alt={d.title}
                      className="w-20 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{d.title}</td>
                  <td>{d.foodType}</td>
                  <td>{d.restaurantName}</td>
                  <td>
                    {d.featured ? (
                      <span className="badge badge-success">Featured</span>
                    ) : (
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => handleFeature(d._id)}
                      >
                        Feature
                      </button>
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

export default FeatureDonations;
