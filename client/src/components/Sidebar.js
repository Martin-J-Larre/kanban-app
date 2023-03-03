import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import assets from "../assets/index";
import boardApi from "../services/boardApi";
import { setBoards } from "../redux/boardRedux";

export const Sidebar = () => {
  const user = useSelector((state) => state.user.value);
  const boards = useSelector((state) => state.board.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardId } = useParams();
  const widthSidebar = 250;

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardApi.getAllBoard();

        dispatch(setBoards(res));
        if (res.boards.length > 0 && boardId === undefined) {
          navigate(`/board/${res.boards[0]._id}`);
        }
      } catch (err) {
        console.log("Sidebar--> getBoard()", err);
      }
    };
    getBoards();
  }, []);

  useEffect(() => {}, [boards]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: widthSidebar,
        height: "100vh",
        "& > div": { borderRight: "none" },
      }}

      // anchor={anchor}
      // onClose={toggleDrawer(anchor, false)}
    >
      <List
        disablePadding
        sx={{
          width: widthSidebar,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: "10px" }} />
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              Favourites
            </Typography>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: "10px" }} />
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              Private
            </Typography>
            <IconButton>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
      </List>
    </Drawer>
  );
};
