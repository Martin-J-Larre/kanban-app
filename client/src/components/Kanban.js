import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import sectionApi from "../services/sectionApi";
import taskApi from "../services/taskApi";
import { ModalTask } from "./ModalTask";

let timer;

export const Kanban = (props) => {
  const boardId = props.boardId;
  const [data, setData] = useState([]);
  const [taskSelected, setTaskSelected] = useState(undefined);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const addSection = async () => {
    try {
      const section = await sectionApi.create(boardId);
      setData([...data, section]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSection = async (sectionId) => {
    try {
      await sectionApi.delete(boardId, sectionId);
      const newData = [...data].filter((elem) => elem._id !== sectionId);
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  };

  const updateSectionTitle = async (e, sectionId) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    const newData = [...data];
    const index = newData.findIndex((elem) => elem._id === sectionId);
    newData[index].title = newTitle;
    setData(newData);
    timer = setTimeout(async () => {
      try {
        await sectionApi.update(boardId, sectionId, { title: newTitle });
      } catch (err) {
        console.log(err);
      }
    }, 500);
  };

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    const sourceColIndex = data.findIndex(
      (elem) => elem._id === source.droppableId
    );
    const destinationColIndex = data.findIndex(
      (elem) => elem._id === destination.droppableId
    );
    const sourceCol = data[sourceColIndex];
    const destinationCol = data[destinationColIndex];

    const sourceSectionId = sourceCol._id;
    const destinationSectionId = destinationCol._id;

    const sourceTasks = [...sourceCol.task];
    const destinationTasks = [...destinationCol.task];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[sourceColIndex].task = sourceTasks;
      data[destinationColIndex].task = destinationTasks;
    } else {
      const [removed] = destinationTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[destinationColIndex].task = destinationTasks;
    }

    try {
      await taskApi.updatePosition(boardId, {
        resourceList: sourceTasks,
        destinationList: destinationTasks,
        resourceSectionId: sourceSectionId,
        destinationSectionId: destinationSectionId,
      });
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async (sectionId) => {
    try {
      const task = await taskApi.create(boardId, { sectionId });
      const newData = [...data];
      const index = newData.findIndex((elem) => elem._id === sectionId);
      newData[index].task.unshift(task);
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdateTask = (tsk) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex(
      (elem) => elem._id === tsk.section._id
    );
    const taskIndex = newData[sectionIndex].task.findIndex(
      (elem) => elem._id === tsk._id
    );
    newData[sectionIndex].task[taskIndex] = tsk;
    setData(newData);
  };

  const onDeleteTask = (tsk) => {
    const newData = [...data];
    const sectionIndex = newData.findIndex(
      (elem) => elem._id === tsk.section._id
    );
    const taskIndex = newData[sectionIndex].task.findIndex(
      (elem) => elem._id === tsk._id
    );
    newData[sectionIndex].task.splice(taskIndex, 1);
    setData(newData);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={addSection}>Add section</Button>
        <Typography variant="body2" fontWeight="700">
          {data.length} Sections
        </Typography>
      </Box>
      <Divider sx={{ margin: "10px 0" }} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            width: "calc(100vw - 400px )",
            overflow: "auto",
          }}
        >
          {data.map((section) => (
            <div key={section._id} style={{ width: "300px" }}>
              <Droppable key={section._id} droppableId={section._id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      width: "300px",
                      padding: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <Box
                      xs={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <TextField
                        value={section.title}
                        onChange={(e) => updateSectionTitle(e, section._id)}
                        placeholder="Untitled"
                        variant="outlined"
                        sx={{
                          flexGrow: 1,
                          "& .MuiOutlinedInput-input": { padding: 0 },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "unset",
                          },
                          "& .MuiOutlinedInput-root": {
                            fontSize: "1rem",
                            fontWeight: "700",
                          },
                        }}
                      />
                      <IconButton
                        variant="outlined"
                        size="small"
                        sx={{ color: "gray", "&:hover": { color: "green" } }}
                        onClick={() => addTask(section._id)}
                      >
                        <AddBoxOutlinedIcon />
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        size="small"
                        sx={{ color: "gray", "&:hover": { color: "red" } }}
                        onClick={() => deleteSection(section._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    {section.task.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              padding: "10px",
                              marginBottom: "10px",
                              cursor: snapshot.isDragging
                                ? "grab"
                                : "pointer!important",
                            }}
                            onClick={() => setTaskSelected(task)}
                          >
                            <Typography>
                              {task.title === "" ? "Untitled" : task.title}
                            </Typography>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </div>
          ))}
        </Box>
      </DragDropContext>
      <ModalTask
        taskSelected={taskSelected}
        boardId={boardId}
        onCloseModal={() => setTaskSelected(undefined)}
        onUpdate={onUpdateTask}
        onDelete={onDeleteTask}
      />
    </>
  );
};
