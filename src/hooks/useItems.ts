import { useEffect, useState } from "react";
import type { Item } from "../types/Item";
import { ItemService } from "../services/itemService";

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [customItems, setCustomItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem("customItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Load demo items
  async function loadInitialItems() {
    const data = await ItemService.getAll();
    setItems(data);
  }

  useEffect(() => {
    loadInitialItems();
  }, []);

  // Persist local
  useEffect(() => {
    localStorage.setItem("customItems", JSON.stringify(customItems));
  }, [customItems]);

  const createItem = async (item: Omit<Item, "id">) => {
    const newItem = await ItemService.create(item);
    setCustomItems((prev) => [newItem, ...prev]);
  };

  const updateItem = async (id: string, item: Omit<Item, "id">) => {
    const updated = await ItemService.update(id, item);
    setCustomItems((prev) =>
      prev.map((it) => (it.id === updated.id ? updated : it))
    );
  };

  const deleteItem = async (id: string) => {
    await ItemService.delete(id);
    setCustomItems((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    items: [...customItems, ...items],
    createItem,
    updateItem,
    deleteItem,
  };
}
