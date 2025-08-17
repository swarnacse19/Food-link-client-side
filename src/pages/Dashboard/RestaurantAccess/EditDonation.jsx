import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const EditDonation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [imageURL, setImageURL] = useState(state?.donation?.imageUrl || "");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (state?.donation) {
      const d = state.donation;
      setValue("title", d.title);
      setValue("foodType", d.foodType);
      setValue("quantity", d.quantity);
      setValue("pickupStart", d.pickupWindow.start);
      setValue("pickupEnd", d.pickupWindow.end);
      setValue("restaurantName", d.restaurantName);
      setValue("restaurantEmail", d.restaurantEmail);
      setValue("location", d.location);
    }
  }, [state, setValue]);

  const { mutateAsync: updateDonation, isPending } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/donations/${id}`, updatedData);
      return res.data;
    },
    onSuccess: (res) => {
      if (res.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Donation Info successfully updated",
        }).then(() => {
          navigate("/dashboard/my-donations");
        });
      } else {
        Swal.fire("No changes made", "", "info");
      }
    },
    onError: () => {
      Swal.fire("Error", "Failed to update donation", "error");
    }
  });

  const onSubmit = async (data) => {
    const updatedDonation = {
      title: data.title,
      foodType: data.foodType,
      quantity: data.quantity,
      pickupWindow: {
        start: data.pickupStart,
        end: data.pickupEnd,
      },
      location: data.location,
      imageUrl: imageURL,
    };

    await updateDonation(updatedDonation);
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
      Swal.fire("Uploaded!", "Image uploaded successfully", "success");
    } catch (err) {
      Swal.fire("Upload Failed", "Image upload error", "error");
    }
  };

  return (
    <div className="text-black font-medium max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 mt-6">Edit Donation</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Donation Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Food Type</label>
          <select {...register("foodType")} className="input input-bordered w-full">
            <option value="Bakery">Bakery</option>
            <option value="Produce">Produce</option>
            <option value="Cooked">Cooked</option>
            <option value="Canned">Canned</option>
            <option value="Pizza">Pizza</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Pasta">Pasta</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Burger">Burger</option>
          </select>
        </div>

        <div>
          <label className="label">Quantity</label>
          <input
            type="text"
            {...register("quantity", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Pickup Start</label>
          <input
            type="time"
            {...register("pickupStart", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Pickup End</label>
          <input
            type="time"
            {...register("pickupEnd", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Restaurant Name</label>
          <input
            type="text"
            {...register("restaurantName")}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="label">Restaurant Email</label>
          <input
            type="email"
            {...register("restaurantEmail")}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="label">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Upload Food Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn bg-[#FF8C42] w-full font-semibold"
        >
          {isPending ? "Updating..." : "Update Donation"}
        </button>
      </form>
    </div>
  );
};

export default EditDonation;
