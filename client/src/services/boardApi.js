import axiosClient from "./axiosClient";

const boardApi = {
  createBoard: () => axiosClient.post("boards"),
  getAllBoard: () => axiosClient.get("boards"),
  updatePosition: (params) => axiosClient.put("boards", params),
};

export default boardApi;
