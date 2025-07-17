import React from 'react';
import { useNavigate } from 'react-router';
import animationData from './Error.json';
import Lottie from 'lottie-react';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
    <div className='flex justify-center items-center min-h-screen'>
      <div className='text-center'>
        <Lottie animationData={animationData} loop={true} style={{ width: 400, height: 400 }}/>
      <h1 className='font-semibold text-xl'>Page not found</h1>
      <button
            onClick={() => navigate("/")}
            className="bg-black font-semibold text-white px-6 py-2 mt-3 rounded-lg"
          >
            Go to home
          </button>
      </div>
    </div>
    </>
  );
}

export default ErrorPage;