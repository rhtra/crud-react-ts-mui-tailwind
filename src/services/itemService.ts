import * as api from "../api/restfulApi";
import type { Item } from "../types/Item";

export const ItemService = {
  getAll: async (): Promise<Item[]> => {
    const data = await api.getItems();
    return data.slice(0, 10);
  },
  create: async (item: Omit<Item, "id">) => api.createItem(item),
  update: async (id: string, item: Omit<Item, "id">) => api.updateItem(id, item),
  delete: async (id: string) => api.deleteItem(id),
};
