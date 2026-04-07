import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <AdminNav userEmail={user?.email} />
      <main className="px-6 py-8 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
