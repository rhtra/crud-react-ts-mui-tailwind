import React from "react";
import { Typography } from "@mui/material";
import ThemeToggle from "../common/ThemeToggle";

interface Props {
  mode: "light" | "dark";
  onToggleTheme: () => void;
}

export default function Header({ mode, onToggleTheme }: Props) {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-neutral-900 shadow-sm rounded-b-md mb-6 p-4">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle mode={mode} toggle={onToggleTheme} />
      </div>

      {/* Title + Add Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <Typography
          variant="h5"
          className="font-bold text-gray-800 dark:text-gray-100"
        >
          React + TypeScript CRUD (RESTful-API.dev)
        </Typography>
      </div>
    </header>
  );
}
