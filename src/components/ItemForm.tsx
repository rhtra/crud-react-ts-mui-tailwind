import React, { useState } from "react";
import type { Item } from "../types/Item";
import { TextField, Button, Stack } from "@mui/material";

interface Props {
  existing?: Item;
  onSubmit: (item: Omit<Item, "id">) => void;
  onCancel: () => void;
}

export default function ItemForm({ existing, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(existing?.name ?? "");
  const [year, setYear] = useState(existing?.data?.year ?? "");
  const [price, setPrice] = useState(existing?.data?.price ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      data: {
        year: Number(year),
        price: Number(price),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <Stack spacing={2}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          required
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {existing ? "Update" : "Create"}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
