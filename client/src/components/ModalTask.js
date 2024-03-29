import { useEffect, useRef, useState } from "react";
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
import taskApi from "../services/taskApi";

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

let timer;
let isModalClosed = false;

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
  const editorWrapperRef = useRef();

  useEffect(() => {
    setTask(taskSelected);
    setTitle(taskSelected !== undefined ? taskSelected.title : "");
    setContent(taskSelected !== undefined ? taskSelected.content : "");
    if (taskSelected !== undefined) {
      isModalClosed = false;
      updateEditorHeight();
    }
  }, [taskSelected]);

  const updateEditorHeight = () => {
    setTimeout(() => {
      if (editorWrapperRef.current) {
        const box = editorWrapperRef.current;
        box.querySelector(".ck-editor__editable_inline").style.height =
          box.offsetHeight - 50 + "px";
      }
    }, 500);
  };

  const onClose = () => {
    isModalClosed = true;
    onUpdate(task);
    onCloseModal();
  };

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    timer = setTimeout(async () => {
      try {
        await taskApi.update(boardId, task._id, { title: newTitle });
      } catch (err) {
        console.log(err);
      }
    }, 500);
    task.title = newTitle;
    setTitle(newTitle);
    onUpdate(task);
  };

  const deleteTask = async () => {
    try {
      await taskApi.delete(boardId, task._id);
      onDelete(task);
      setTask(undefined);
    } catch (err) {
      console.log(err);
    }
  };

  const updateContent = async (e, editor) => {
    clearTimeout(timer);
    const data = editor.getData();

    console.log({ isModalClosed });
    if (!isModalClosed) {
      timer = setTimeout(async () => {
        try {
          await taskApi.update(boardId, task._id, { content: data });
        } catch (err) {
          console.log(err);
        }
      }, 500);
      task.content = data;
      setContent(data);
      onUpdate(task);
    }
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
            <IconButton variant="outlined" color="error" onClick={deleteTask}>
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
              onChange={updateTitle}
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
              ref={editorWrapperRef}
              sx={{
                height: "80%",
                overflowX: "hidden",
                overflowY: "auto",
              }}
            >
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={updateContent}
                onFocus={updateEditorHeight}
                onBlur={updateEditorHeight}
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
