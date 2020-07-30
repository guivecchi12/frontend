import axios from "axios";

const axiosWithAuth = () => {
  const token = window.localStorage.getItem("token");
  return axios.create({
    baseURL: "https://ptct-expat-journal-backend.herokuapp.com",
    headers: {
      Authorization: token,
    },
  });
};

export default axiosWithAuth;
