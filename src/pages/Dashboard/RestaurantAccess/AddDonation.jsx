import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

function AddDonation() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [imageURL, setImageURL] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const donationData = {
      title: data.title,
      foodType: data.foodType,
      quantity: data.quantity,
      pickupWindow: {
        start: data.pickupStart,
        end: data.pickupEnd,
      },
      restaurantName: user?.displayName,
      restaurantEmail: user?.email,
      location: data.location,
      imageUrl: imageURL,
      status: "Pending",
      created_at: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/donations", donationData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Donation Added",
          text: "Your donation has been added successfully!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add donation. Please try again!",
      });
      console.error(error);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const uploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    try {
      const res = await axios.post(uploadUrl, formData);
      setImageURL(res.data.data.url);
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed");
      console.error(err);
    }
  };

  return (
    <div className="text-black font-medium max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 mt-6">
        Add Surplus Food Donation
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Donation Title */}
        <div>
          <label className="label">Donation Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g., Surplus Pastries"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        {/* Food Type */}
        <div>
          <label className="label">Food Type</label>
          <select
            {...register("foodType", { required: true })}
            className="input input-bordered w-full"
          >
            <option value="">Select</option>
            <option value="Bakery">Bakery</option>
            <option value="Produce">Produce</option>
            <option value="Cooked">Cooked</option>
            <option value="Canned">Canned</option>
          </select>
          {errors.foodType && (
            <p className="text-red-500">Food type is required</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="label">Quantity</label>
          <input
            type="text"
            {...register("quantity", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g., 10 kg or 20 portions"
          />
          {errors.quantity && (
            <p className="text-red-500">Quantity is required</p>
          )}
        </div>

        {/* Pickup Time Start */}
        <div>
          <label className="label">Pickup Time Start</label>
          <input
            type="time"
            {...register("pickupStart", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Pickup Time End */}
        <div>
          <label className="label">Pickup Time End</label>
          <input
            type="time"
            {...register("pickupEnd", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Restaurant Name */}
        <div>
          <label className="label">Restaurant Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Restaurant Email */}
        <div>
          <label className="label">Restaurant Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Location */}
        <div>
          <label className="label">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. Dhaka, Bangladesh"
          />
          {errors.location && (
            <p className="text-red-500">Location is required</p>
          )}
        </div>

        {/* Upload Image */}
        <div>
          <label className="label">Upload Food Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn bg-[#FF8C42] w-full font-semibold">
          Add Donation
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default AddDonation;
