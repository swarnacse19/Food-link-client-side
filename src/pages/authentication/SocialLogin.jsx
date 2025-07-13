import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

function SocialLogin() {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();

  const handleLogin = () => {
  signInWithGoogle()
    .then(async (result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);

      const userInfo = {
        email: loggedInUser.email,
        role: "user", 
        created_at: new Date().toISOString(),
        name: loggedInUser.displayName,
        photo: loggedInUser.photoURL,
      };

      try {
        const res = await axiosInstance.post("/users", userInfo);
        console.log("Server response:", res.data);
      } catch (error) {
        console.error("Error saving user to DB:", error.message);
      }

      toast.success("Continue with Google Successfully!");
      setTimeout(() => navigate(`${location.state ? location.state : "/"}`), 3000);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

  return (
    <div>
      <p className="text-center my-2">Or</p>
      <button
        onClick={handleLogin}
        className="btn w-[320px] bg-gray-200 text-black border-[#e5e5e5]"
      >
        <FcGoogle size={30} />
        Continue with Google
      </button>
    </div>
  );
}

export default SocialLogin;
