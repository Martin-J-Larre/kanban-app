import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import boardApi from "../services/boardApi";
import { EmojiPicker } from "../components/EmojiPicker";
import { setBoards } from "../redux/boardRedux";

let timer;
const timeOut = 500;

export const Board = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [icon, setIcon] = useState("");

  const boards = useSelector((state) => state.board.value);

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await boardApi.getOneBoard(boardId);
        setTitle(res.title);
        setDescription(res.description);
        setSections(res.sections);
        setIsFavourite(res.favourite);
        setIcon(res.icon);
      } catch (err) {
        console.log(err);
      }
    };
    getBoard();
  }, [boardId]);

  const onIconChange = async (newIcon) => {
    let data = [...boards];
    const index = data.findIndex((e) => e._id === boardId);
    data[index] = { ...data[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setBoards(data));
    try {
      await boardApi.updateBoard(boardId, { icon: newIcon });
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);
    let data = [...boards];
    const index = data.findIndex((e) => e._id === boardId);
    data[index] = { ...data[index], title: newTitle };
    dispatch(setBoards(data));
    timer = setTimeout(async () => {
      try {
        await boardApi.updateBoard(boardId, { title: newTitle });
      } catch (err) {
        console.log(err);
      }
    }, timeOut);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);
    timer = setTimeout(async () => {
      try {
        await boardApi.updateBoard(boardId, { description: newDescription });
      } catch (err) {
        console.log(err);
      }
    }, timeOut);
  };

  const addFavourite = async () => {
    try {
      await boardApi.updateBoard(boardId, { favourite: !isFavourite });
      setIsFavourite(!isFavourite);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton variant="outlined" onClick={addFavourite}>
          {isFavourite ? (
            <StarOutlinedIcon color="warning" />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton variant="outlined" color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            value={title}
            onChange={updateTitle}
            placeholder="Untitled"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
              "& .MuiOutlinedInput-root": {
                fontSize: "2rem",
                fontWeight: "700",
              },
            }}
          />
          <TextField
            value={description}
            onChange={updateDescription}
            placeholder="Add a descrition"
            variant="outlined"
            multiline
            fullWidth
            sx={{
              "& .MuiOutlinedInput-input": { padding: 0 },
              "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
              "& .MuiOutlinedInput-root": {
                fontSize: "1rem",
              },
            }}
          />
        </Box>
        <Box>{/* {Kanban board} */}</Box>
      </Box>
      {/* <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button>Add section</Button>
          <Typography variant="body2" fontWeight="700">
            {sections.length} Sections
          </Typography>
        </Box>
      </Box> */}
    </>
  );
};
