import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  TableSortLabel,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Item } from "../types/Item";
import SearchBar from "./common/SearchBar";

interface Props {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  onAddClick: () => void;
}

type SortKey = "name" | "year" | "price" | null;
type SortOrder = "asc" | "desc";

export default function ItemList({ items, onEdit, onDelete, onAddClick }: Props) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredItems = useMemo(() => {
    let filtered = items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortKey) {
      filtered = filtered.sort((a, b) => {
        let aValue: any = sortKey === "name" ? a.name : a.data?.[sortKey];
        let bValue: any = sortKey === "name" ? b.name : b.data?.[sortKey];

        if (aValue === undefined) aValue = "";
        if (bValue === undefined) bValue = "";

        if (sortOrder === "asc") return aValue > bValue ? 1 : -1;
        else return aValue < bValue ? 1 : -1;
      });
    }

    return filtered;
  }, [items, search, sortKey, sortOrder]);

  // Determine which items are original (from RESTful API)
  const isOriginalItem = (id?: string) =>
    id && !id.startsWith("temp-") && id.length < 20;

  return (
    <section className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search items by name..."
        />
      </div>

      <Divider />

      {filteredItems.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <Typography variant="body1">No items found.</Typography>
          <Typography variant="body2" className="text-gray-400">
            Try adjusting your search.
          </Typography>
        </div>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          className="rounded-xl overflow-hidden"
        >
          <Table>
            <TableHead>
              <TableRow className="bg-gray-100 dark:bg-neutral-800">
                <TableCell>
                  <TableSortLabel
                    active={sortKey === "name"}
                    direction={sortKey === "name" ? sortOrder : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Name
                    </span>
                  </TableSortLabel>
                </TableCell>

                <TableCell>
                  <TableSortLabel
                    active={sortKey === "year"}
                    direction={sortKey === "year" ? sortOrder : "asc"}
                    onClick={() => handleSort("year")}
                  >
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Year
                    </span>
                  </TableSortLabel>
                </TableCell>

                <TableCell>
                  <TableSortLabel
                    active={sortKey === "price"}
                    direction={sortKey === "price" ? sortOrder : "asc"}
                    onClick={() => handleSort("price")}
                  >
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Price ($)
                    </span>
                  </TableSortLabel>
                </TableCell>

                <TableCell align="right">
                  <div className="flex justify-end items-center gap-2">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </span>
                    <Tooltip title="Add New Item">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={onAddClick}
                        sx={{
                          bgcolor: "primary.main",
                          color: "white",
                          "&:hover": { bgcolor: "primary.dark" },
                          p: "4px",
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredItems.map((item) => {
                const disabled = isOriginalItem(item.id);

                return (
                  <TableRow
                    key={item.id}
                    className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-neutral-800"
                  >
                    <TableCell className="py-3 px-4 font-medium">
                      {item.name}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {item.data?.year ?? "-"}
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      {item.data?.price ? `$${item.data.price}` : "-"}
                    </TableCell>
                    <TableCell align="right" className="py-3 px-4">
                      <div
                        className={`flex justify-end gap-2 transition-opacity ${
                          disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
                        }`}
                      >
                        <Tooltip
                          title={
                            disabled
                              ? "Editing disabled for original API items"
                              : "Edit"
                          }
                        >
                          <span>
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => !disabled && onEdit(item)}
                              disabled={disabled}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>

                        <Tooltip
                          title={
                            disabled
                              ? "Deleting disabled for original API items"
                              : "Delete"
                          }
                        >
                          <span>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => !disabled && onDelete(item.id!)}
                              disabled={disabled}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </section>
  );
}
