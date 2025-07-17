import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Loading/Loading";

function CharityTransactions() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["charity-transactions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity-transactions/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const transactions = data?.transactions || [];
  const status = data?.status || "Pending";

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.transactionId}>
                <td className="text-sm">{tx.transactionId}</td>
                <td>${tx.amount}</td>
                <td>{new Date(tx.paid_at).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      status === "Approved"
                        ? "badge-success"
                        : status === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CharityTransactions;
