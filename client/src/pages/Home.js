import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export const Home = () => {
  const addBoard = () => {};

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton variant="outlined" color="success" onClick={addBoard}>
        Click here for start
      </LoadingButton>
    </Box>
  );
};
