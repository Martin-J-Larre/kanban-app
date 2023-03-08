import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

export const EmojiPicker = (props) => {
  const [emoji, SetEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    SetEmoji(props.icon);
  }, [props.icon]);

  const selectEmoji = (e) => {
    const sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((element) => codesArray.push("0x" + element));
    const emojis = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    props.onChange(emojis);
  };

  const showPicker = () => setIsShowPicker(!isShowPicker);

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
