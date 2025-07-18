import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const LatestCharityRequests = () => {
  const axiosInstance = useAxios();

  const { data: latestRequests = [], isLoading } = useQuery({
    queryKey: ["latest-charity-requests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/latest-charity-requests");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading recent requests...</p>;

  return (
    <div className="my-10 px-4 max-w-11/12 mx-auto">
      <h2 className="text-3xl text-center font-bold mb-6">Latest Charity Requests</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {latestRequests.map((req) => (
          <div
            key={req._id}
            className="bg-white shadow-lg p-7 rounded-xl border"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={req.charityImage || "/default-avatar.png"}
                alt={req.charityName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{req.charityName}</p>
                <p className="text-lg text-gray-500">{req.charityEmail}</p>
              </div>
            </div>
            <h4 className="font-bold text-xl text-gray-700">
              Donation: {req.donationTitle}
            </h4>
            <p className="text-lg mt-2 text-gray-600">{req.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCharityRequests;
