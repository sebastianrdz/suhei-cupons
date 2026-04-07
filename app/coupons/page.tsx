import { createClient } from "@/lib/supabase/server";
import CouponsSection from "@/components/CouponsSection";

export default async function CouponsPage() {
  const supabase = await createClient();
  const { data: coupons, error } = await supabase
    .from("coupons")
    .select("*");

  return <CouponsSection coupons={coupons ?? []} showBackButton />;
}
