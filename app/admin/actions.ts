"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

export async function createCoupon(formData: FormData) {
  const supabase = await requireAdmin();

  const { error } = await supabase.from("coupons").insert({
    id: formData.get("id") as string,
    category: formData.get("category") as string,
    title: formData.get("title") as string,
    subtitle: formData.get("subtitle") as string,
    description: formData.get("description") as string,
    special: formData.get("special") === "on",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/coupons");
  redirect("/admin");
}

export async function updateCoupon(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const { error } = await supabase
    .from("coupons")
    .update({
      category: formData.get("category") as string,
      title: formData.get("title") as string,
      subtitle: formData.get("subtitle") as string,
      description: formData.get("description") as string,
      special: formData.get("special") === "on",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/coupons");
  redirect("/admin");
}

export async function deleteCoupon(id: string) {
  const supabase = await requireAdmin();

  const { error } = await supabase.from("coupons").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/coupons");
}
