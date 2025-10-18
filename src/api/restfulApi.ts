import type { Item } from "../types/Item";

const BASE_URL = "https://api.restful-api.dev/objects";

export async function getItems(): Promise<Item[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch items");
  return res.json();
}

export async function createItem(item: Omit<Item, "id">): Promise<Item> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}

export async function updateItem(id: string, item: Omit<Item, "id">): Promise<Item> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to update item");
  return res.json();
}

export async function deleteItem(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete item");
}
