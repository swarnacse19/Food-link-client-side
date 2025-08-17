import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Loading/Loading";

const LatestCharityRequests = () => {
  const axiosInstance = useAxios();

  const { data: latestRequests = [], isLoading } = useQuery({
    queryKey: ["latest-charity-requests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/latest-charity-requests");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="py-20 px-4 md:px-10 mx-auto">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-14 text-orange-500 text-center">Latest Charity Requests</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {latestRequests.map((req) => (
          <div
            key={req._id}
            className="bg-orange-50 shadow-lg p-7 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={req.charityImage || "/default-avatar.png"}
                alt={req.charityName}
                className="w-12 h-12 rounded-full border object-cover"
              />
              <div>
                <p className="font-semibold">{req.charityName}</p>
                <p className="text-lg text-gray-500">{req.charityEmail}</p>
              </div>
            </div>
            <hr className="text-gray-300" />
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
