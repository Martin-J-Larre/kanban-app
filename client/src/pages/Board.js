import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import StartOutlinedIcon from "@mui/icons-material/StartOutlined";
import StartBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
// import { EmojiPicker } from "emoji-mart";
import boardApi from "../services/boardApi";

export const Board = () => {
  const { boardId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await boardApi.getOneBoard(boardId);
        console.log("res ==>", res);
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
        <IconButton variant="outlined">
          {isFavourite ? (
            <StartOutlinedIcon color="warning" />
          ) : (
            <StartBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton variant="outlined" color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          {/* Emoji picker */}
          <TextField
            value={title}
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
