import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface Props {
  mode: "light" | "dark";
  toggle: () => void;
}

export default function ThemeToggle({ mode, toggle }: Props) {
  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <IconButton color="inherit" onClick={toggle}>
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
}
