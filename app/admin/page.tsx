import { getSupabasePublicConfig } from "@/db";
import AdminPortal from "./AdminPortal";
import "./admin.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Passageway Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const config = await getSupabasePublicConfig().catch(() => null);
  return <AdminPortal config={config} />;
}
