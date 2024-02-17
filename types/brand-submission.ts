import { ShoppingCategory } from "@/types/shopping-category";

export type BrandSubmission = {
  id: number;
  name: string;
  website: string;
  categories: ShoppingCategory[];
  created_at: string;
  updated_at: string;
  status: string;
  reject_reason: string;
  why_reason: string;
};