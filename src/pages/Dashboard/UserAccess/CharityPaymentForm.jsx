import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

function CharityPaymentForm({ formData }) {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const amount = 25;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (cardError) {
        setError(cardError.message);
        toast.error(cardError.message);
        return;
      }

      const intentRes = await axiosSecure.post("/create-payment-intent", { amountInCents });
      const clientSecret = intentRes.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        toast.error(result.error.message);
        return;
      }

      const transactionId = result.paymentIntent.id;
      if (result.paymentIntent.status === "succeeded") {
        const res = await axiosSecure.post("/charity-role-request", {
          email: user.email,
          name: user.displayName,
          organization: formData.organization,
          mission: formData.mission,
          amount,
          transactionId,
          paymentMethod: result.paymentIntent.payment_method_types,
        });

        if (res.data.insertedId) {
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
          });
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while processing payment.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        className="btn w-full font-semibold bg-[#CAEB66]"
        disabled={!stripe}
      >
        Pay $25
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default CharityPaymentForm;