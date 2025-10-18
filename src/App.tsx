import React, { useState, useMemo } from "react";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  Container,
  Snackbar,
} from "@mui/material";
import { useItems } from "./hooks/useItems";
import Header from "./components/layout/Header";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import ModalWrapper from "./components/common/ModalWrapper";
import ConfirmDialog from "./components/common/ConfirmDialog";
import type { Item } from "./types/Item";

export default function App() {
  const { items, createItem, updateItem, deleteItem } = useItems();
  const [editing, setEditing] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          background: { default: mode === "light" ? "#f9fafb" : "#121212" },
        },
        shape: { borderRadius: 10 },
      }),
    [mode]
  );

  const handleDeleteClick = (id: string) => {
    setTargetId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (targetId) {
      await deleteItem(targetId);
      setSnackbar({ open: true, message: "Item deleted successfully!" });
      setTargetId(null);
      setConfirmOpen(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" className="py-10">
        <Header
          mode={mode}
          onToggleTheme={toggleTheme}
        />

        {/* Item list */}
        <ItemList
          items={items}
          onEdit={(it) => {
            setEditing(it);
            setOpen(true);
          }}
          onDelete={handleDeleteClick}
          onAddClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        />

        {/* Add/Edit Modal */}
        <ModalWrapper
          open={open}
          title={editing ? "Edit Item" : "Add New Item"}
          onClose={() => {
            setOpen(false);
            setEditing(null);
          }}
        >
          <ItemForm
            existing={editing ?? undefined}
            onSubmit={async (item) => {
              if (editing?.id) {
                await updateItem(editing.id, item);
                setSnackbar({ open: true, message: "Item updated successfully!" });
              } else {
                await createItem(item);
                setSnackbar({ open: true, message: "Item added successfully!" });
              }
              setOpen(false);
              setEditing(null);
            }}
            onCancel={() => {
              setOpen(false);
              setEditing(null);
            }}
          />
        </ModalWrapper>

        {/* Confirm delete dialog */}
        <ConfirmDialog
          open={confirmOpen}
          title="Delete Item"
          message="Are you sure you want to permanently delete this item?"
          confirmLabel="Delete"
          cancelLabel="Cancel"
          confirmColor="error"
          onCancel={() => {
            setConfirmOpen(false);
            setTargetId(null);
          }}
          onConfirm={confirmDelete}
        />

        {/* Snackbar feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          message={snackbar.message}
          onClose={() => setSnackbar({ open: false, message: "" })}
        />
      </Container>
    </ThemeProvider>
  );
}
