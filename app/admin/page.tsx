import Link from "next/link";
import { getChatGPTUser, chatGPTSignOutPath } from "@/app/chatgpt-auth";
import { getCmsUser } from "@/app/lib/cms-auth";
import AdminDashboard from "./AdminDashboard";
import "./admin.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Passageway Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const identity = await getChatGPTUser();
  if (!identity) return <SignInPanel />;

  let user = null;
  let databaseUnavailable = false;
  try {
    user = await getCmsUser();
  } catch {
    databaseUnavailable = true;
  }

  if (!user) return <AccessPanel email={identity.email} databaseUnavailable={databaseUnavailable} />;
  return <AdminDashboard user={user} signOutUrl={chatGPTSignOutPath("/")} />;
}

function SignInPanel() {
  return (
    <main className="admin-gate">
      <div className="admin-gate-card">
        <img src="/images/passageway-logo.png" alt="Passageway Consulting" />
        <p className="admin-kicker">Passageway Admin</p>
        <h1>A calm place to keep the website growing.</h1>
        <p>Sign in with the ChatGPT account invited by a Passageway administrator.</p>
        <a className="admin-primary-button" href="/signin-with-chatgpt?return_to=%2Fadmin">Sign in to Passageway Admin</a>
        <Link href="/">Return to the website</Link>
      </div>
    </main>
  );
}

function AccessPanel({ email, databaseUnavailable }: { email: string; databaseUnavailable: boolean }) {
  return (
    <main className="admin-gate">
      <div className="admin-gate-card">
        <img src="/images/passageway-logo.png" alt="Passageway Consulting" />
        <p className="admin-kicker">Passageway Admin</p>
        <h1>{databaseUnavailable ? "The admin space is being prepared." : "This account has not been invited yet."}</h1>
        <p>{databaseUnavailable ? "The content database will become available with the platform release." : `You are signed in as ${email}. Ask a Passageway administrator to add this email under Admin users.`}</p>
        <a className="admin-primary-button" href={chatGPTSignOutPath("/admin")}>Use another account</a>
        <Link href="/">Return to the website</Link>
      </div>
    </main>
  );
}
