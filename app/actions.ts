"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleCouponRedeemed(id: string, redeemed: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("coupons")
    .update({ redeemed })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/coupons");
}
