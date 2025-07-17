import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CharityForm from "./CharityForm";
import CharityPaymentForm from "./CharityPaymentForm";
import Loading from "../../../Loading/Loading";

// Stripe Elements imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Stripe public key setup
const stripePromise = loadStripe(import.meta.env.VITE_PaymentKey);

function CharityWrapper() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: existingRequest, isLoading } = useQuery({
    queryKey: ["charity-role-request", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity-role-request/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (existingRequest?.status === "Pending" || existingRequest?.status === "Approved") {
    return (
      <div className="text-center text-lg text-gray-600 mt-8">
        You have already submitted a Charity role request. Status:
        <span className="font-semibold"> {existingRequest.status}</span>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Request Charity Role</h2>
      {!formData ? (
        <CharityForm
          onSubmit={handleSubmit((data) => setFormData(data))}
          user={user}
          errors={errors}
          register={register}
        />
      ) : (
        //  Payment form wrapped with Elements
        <Elements stripe={stripePromise}>
          <CharityPaymentForm formData={formData} />
        </Elements>
      )}
    </div>
  );
}

export default CharityWrapper;
