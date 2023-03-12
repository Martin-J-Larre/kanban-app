import axiosClient from "./axiosClient";

const boardApi = {
  createBoard: () => axiosClient.post("boards"),
  getAllBoard: () => axiosClient.get("boards"),
  updatePosition: (params) => axiosClient.put("boards", params),
  getOneBoard: (id) => axiosClient.get(`boards/${id}`),
  updateBoard: (id, params) => axiosClient.put(`boards/${id}`, params),
  getFavourites: () => axiosClient.get("boards/favourites"),
  updateFavouritePosition: (params) =>
    axiosClient.put("boards/favourites", params),
};

export default boardApi;
