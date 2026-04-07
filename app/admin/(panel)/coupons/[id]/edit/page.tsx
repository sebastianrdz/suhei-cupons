import { createClient } from "@/lib/supabase/server";
import { updateCoupon } from "@/app/admin/actions";
import CouponForm from "@/components/admin/CouponForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditCouponPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: coupon } = await supabase
    .from("coupons")
    .select("*")
    .eq("id", id)
    .single();

  if (!coupon) notFound();

  const updateAction = updateCoupon.bind(null, id);

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin"
          className="font-serif text-sm transition-colors duration-150 hover:opacity-70"
          style={{ color: "var(--text-muted)" }}
        >
          ← Volver
        </Link>
        <h1 className="font-display text-4xl mt-3" style={{ color: "var(--text-head)" }}>
          Editar cupón
        </h1>
        <p className="font-sans text-xs mt-1" style={{ color: "var(--text-muted)" }}>{id}</p>
      </div>

      <CouponForm action={updateAction} defaultValues={coupon} isEdit />
    </div>
  );
}
