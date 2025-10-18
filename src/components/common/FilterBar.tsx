import React from "react";
import { Select, MenuItem, Button } from "@mui/material";

interface FilterBarProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function FilterBar({
  value,
  options,
  onChange,
  onClear,
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="small"
        className="w-full sm:w-40"
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          borderRadius: "8px",
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>

      <Button
        variant="outlined"
        size="small"
        onClick={onClear}
        sx={{
          textTransform: "none",
          borderColor: "gray.400",
          color: "text.secondary",
        }}
      >
        Clear
      </Button>
    </div>
  );
}
