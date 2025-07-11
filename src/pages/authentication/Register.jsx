import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import imageIcon from "../../assets/image-upload-icon.png";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

function Register() {
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //console.log(data);
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        // update userinfo in the database
        const userInfo = {
          email: data.email,
          role: "user", // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);

        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            console.log("profile name and pic updated");
          })
          .catch((error) => {
            console.log(error);
          });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    //console.log(image);

    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imagUploadUrl, formData);

    setProfilePic(res.data.data.url);
  };

  return (
    <div className="text-black font-medium mx-auto">
      <h1 className="text-3xl font-bold mt-6">Create an Account</h1>
      <p className="mt-2 mb-4">Register with Profast</p>
      <img src={imageIcon} alt="" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name")}
            className="input"
            placeholder="Name"
          />
          <label className="label">Your Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="input"
            placeholder="Your Profile picture"
          />
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type == "required" && (
            <p className="text-red-500">This password field is required</p>
          )}
          {errors.password?.type == "minLength" && (
            <p className="text-red-500">
              This password at least must be 6 characters
            </p>
          )}
          <button className="btn bg-[#CAEB66] w-[320px]">Register</button>
        </fieldset>
      </form>
      <p className="font-semibold mt-2 text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-[#CAEB66]">
          Login
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
}

export default Register;
