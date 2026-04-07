import { createClient } from "@/lib/supabase/server";
import { deleteCoupon } from "@/app/admin/actions";
import Link from "next/link";

const categoryStyle: Record<string, { background: string; color: string }> = {
  Actividades: { background: "#EFF6FF", color: "#1D4ED8" },
  Comida:      { background: "#FFF7ED", color: "#C2410C" },
  Extras:      { background: "var(--pink-pale)", color: "var(--pink-dark)" },
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: coupons } = await supabase
    .from("coupons")
    .select("*");

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl" style={{ color: "var(--text-head)" }}>
            Cupones
          </h1>
          <p className="font-serif text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {coupons?.length ?? 0} cupones en total
          </p>
        </div>
        <Link
          href="/admin/coupons/new"
          className="font-serif text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-150 hover:scale-[1.02] hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, var(--pink), var(--pink-dark))",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(236,72,153,0.25)",
          }}
        >
          + Nuevo cupón
        </Link>
      </div>

      {/* Table */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ border: "1.5px solid var(--border)", boxShadow: "0 4px 20px rgba(236,72,153,0.06)" }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Cupón", "Categoría", "Canjeado", "Especial", "Acciones"].map((h) => (
                <th key={h} className="px-6 py-4 text-left font-sans text-xs uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(coupons ?? []).map((coupon) => (
              <tr
                key={coupon.id}
                className="transition-colors duration-150 hover:bg-[#FDF2F8]"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <td className="px-6 py-4">
                  <p className="font-serif font-semibold" style={{ color: "var(--text-head)" }}>
                    {coupon.title}
                  </p>
                  <p className="font-sans text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {coupon.id}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className="px-2.5 py-1 rounded-full font-sans text-xs font-semibold"
                    style={categoryStyle[coupon.category] ?? {}}
                  >
                    {coupon.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-sans text-sm">
                  {coupon.redeemed ? (
                    <span style={{ color: "#059669" }}>✓ Sí</span>
                  ) : (
                    <span style={{ color: "var(--text-muted)" }}>—</span>
                  )}
                </td>
                <td className="px-6 py-4 font-sans text-sm">
                  {coupon.special ? (
                    <span style={{ color: "var(--lavender)" }}>★ Sí</span>
                  ) : (
                    <span style={{ color: "var(--text-muted)" }}>—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/coupons/${coupon.id}/edit`}
                      className="font-serif text-sm transition-colors duration-150 hover:opacity-70"
                      style={{ color: "var(--pink)" }}
                    >
                      Editar
                    </Link>
                    <form action={async () => { "use server"; await deleteCoupon(coupon.id); }}>
                      <button
                        type="submit"
                        className="font-serif text-sm transition-colors duration-150 cursor-pointer hover:opacity-70"
                        style={{ color: "#DC2626" }}
                      >
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(coupons?.length ?? 0) === 0 && (
          <div className="text-center py-16">
            <p className="font-display text-3xl mb-2" style={{ color: "var(--pink-light)" }}>
              Sin cupones aún
            </p>
            <Link href="/admin/coupons/new" className="font-serif text-sm underline" style={{ color: "var(--pink)" }}>
              Crear el primero
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
