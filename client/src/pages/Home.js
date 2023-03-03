import { useState } from "react";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { setBoards } from "../redux/boardRedux";
import { useNavigate } from "react-router-dom";
import boardApi from "../services/boardApi";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const createBoard = async () => {
    setLoader(true);
    try {
      const res = await boardApi.createBoard();
      console.log("🚀 ~ file: Home.js:18 ~ createBoard ~ res:", res);

      dispatch(setBoards([res]));

      navigate(`/board/${res.board._id}`);
    } catch (err) {
      console.log("file: Home.js:15 ~ createBoard ~ err:", err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        color="success"
        onClick={createBoard}
        loading={loader}
      >
        Click here for start
      </LoadingButton>
    </Box>
  );
};
