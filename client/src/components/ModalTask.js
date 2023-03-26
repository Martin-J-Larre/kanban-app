import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Backdrop,
  Box,
  Divider,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const styles = {
  outline: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "80%",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 1,
};

export const ModalTask = ({
  boardId,
  taskSelected,
  onCloseModal,
  onUpdate,
  onDelete,
}) => {
  const [task, setTask] = useState(taskSelected);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTask(taskSelected);
    setTitle(taskSelected !== undefined ? taskSelected.title : "");
    setContent(taskSelected !== undefined ? taskSelected.content : "");
  }, [taskSelected]);

  const onClose = () => {
    onUpdate(task);
    onCloseModal();
  };
  return (
    <Modal
      open={task !== undefined}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={task !== undefined}>
        <Box sx={styles}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <IconButton variant="outlined" color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              padding: "2rem 5rem 5 rem",
            }}
          >
            <TextField
              value={title}
              // onChange={updateTitle}
              placeholder="Untitled"
              variant="outlined"
              fullWidth
              sx={{
                width: "100%",
                marginBottom: "10px",
                "& .MuiOutlinedInput-input": { padding: 0 },
                "& .MuiOutlinedInput-notchedOutline": { border: "unset" },
                "& .MuiOutlinedInput-root": {
                  fontSize: "2.5rem",
                  fontWeight: "700",
                },
              }}
            />
            <Typography variant="body2" fontWeight="700">
              {task !== undefined
                ? Moment(task.createAt).format("MM-DD-YYYY")
                : ""}
            </Typography>
            <Divider sx={{ margin: "1.5rem 0" }} />
            <Box
              sx={{
                height: "80%",
                overflowX: "hidden",
                overflowY: "auto",
              }}
            >
              <CKEditor editor={ClassicEditor} data={content} />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
