import { ShoppingCategory } from "@/types/shopping-category";

export type Brand = {
  id: number;
  name: string;
  website: string;
  categories: ShoppingCategory[];
  created_at: string;
};
