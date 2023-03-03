import axiosClient from "./axiosClient";

const boardApi = {
  createBoard: () => axiosClient.post("boards"),
  getAllBoard: () => axiosClient.get("boards"),
};

export default boardApi;
