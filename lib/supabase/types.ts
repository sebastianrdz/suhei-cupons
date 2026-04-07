export type CouponCategory = "Actividades" | "Comida" | "Extras";

export interface CouponRow {
  id: string;
  category: CouponCategory;
  title: string;
  subtitle: string;
  description: string;
  special: boolean;
  redeemed: boolean;
  image_urls: string[];
  created_at: string;
  updated_at: string;
}
