import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

function SocialLogin() {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(`${location.state ? location.state : "/"}`);
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
