import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export const EmojiPicker = ({ icon }) => {
  const [emoji, SetEmoji] = useState();
  const [isShowPicker, SetIsShowPicker] = useState(false);

  useEffect(() => {
    SetEmoji(icon);
  }, [icon]);

  const selectEmoji = (e) => {};

  const showPicker = () => SetIsShowPicker(!isShowPicker);

  return (
    <Box sx={{ position: "relative", width: "max-content" }}>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{
          cursor: "pointer",
        }}
        onClick={showPicker}
      >
        {emoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          top: "100%",
          zIndex: "1000",
        }}
      >
        <Picker theme="dark" onSelect={selectEmoji} showPreview={false} />
      </Box>
    </Box>
  );
};
