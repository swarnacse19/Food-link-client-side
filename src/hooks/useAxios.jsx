import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://food-donation-server-side-chi.vercel.app`,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
