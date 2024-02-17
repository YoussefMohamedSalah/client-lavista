/**
 * Type definition for a shopping category.
 *
 * @property id - The unique identifier for the shopping category.
 * @property name - The name of the shopping category.
 * @property updated_at - The timestamp of the last update for the shopping category.
 */
export type ShoppingCategory = {
  id: number;
  name: string;
  updated_at?: string;
};
