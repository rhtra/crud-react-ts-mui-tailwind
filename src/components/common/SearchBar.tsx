import { InputBase } from "@mui/material";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="flex items-center border border-gray-300 dark:border-neutral-700 rounded-md px-3 py-1.5 bg-white dark:bg-neutral-900 w-full sm:w-1/2">
      <InputBase
        placeholder={placeholder}
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          fontSize: 14,
          color: "text.primary",
          "& input::placeholder": {
            color: "text.secondary",
            opacity: 0.8,
          },
        }}
      />
    </div>
  );
}
