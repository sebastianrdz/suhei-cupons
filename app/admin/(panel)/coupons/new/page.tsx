import { createCoupon } from "@/app/admin/actions";
import CouponForm from "@/components/admin/CouponForm";
import Link from "next/link";

export default function NewCouponPage() {
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
          Nuevo cupón
        </h1>
      </div>
      <CouponForm action={createCoupon} />
    </div>
  );
}
