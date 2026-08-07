"use client";

import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { SupabasePublicConfig } from "@/db";
import type { CmsUser } from "@/app/lib/cms-auth";
import AdminDashboard from "./AdminDashboard";

export default function AdminPortal({ config }: { config: SupabasePublicConfig | null }) {
  const client = useMemo(() => config ? createClient(config.url, config.publishableKey, {
    auth: { detectSessionInUrl: true, persistSession: true, autoRefreshToken: true },
  }) : null, [config]);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<CmsUser | null>(null);
  const [loading, setLoading] = useState(Boolean(client));
  const [accessError, setAccessError] = useState("");

  useEffect(() => {
    if (!client) return;
    let active = true;

    async function acceptSession(next: Session | null) {
      if (!active) return;
      setSession(next);
      setUser(null);
      setAccessError("");
      if (!next) { setLoading(false); return; }
      setLoading(true);
      try {
        const response = await fetch("/api/admin/content?collection=services", {
          cache: "no-store",
          headers: { authorization: `Bearer ${next.access_token}` },
        });
        const payload = await response.json() as { user?: CmsUser; error?: string };
        if (!response.ok || !payload.user) throw new Error(payload.error || "This email has not been invited to Passageway Admin.");
        if (active) setUser(payload.user);
      } catch (error) {
        if (active) setAccessError(error instanceof Error ? error.message : "Passageway Admin access is unavailable.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void client.auth.getSession().then(({ data }) => acceptSession(data.session));
    const { data: listener } = client.auth.onAuthStateChange((_event, next) => { void acceptSession(next); });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, [client]);

  if (!config || !client) return <PreparingPanel />;
  if (loading) return <LoadingPanel />;
  if (session && user) {
    return <AdminDashboard user={user} accessToken={session.access_token} onSignOut={async () => { await client.auth.signOut(); }} />;
  }
  if (session) return <AccessPanel client={client} email={session.user.email ?? "this email"} message={accessError} />;
  return <SignInPanel client={client} />;
}

function SignInPanel({ client }: { client: SupabaseClient }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  async function sendLink(event: React.FormEvent) {
    event.preventDefault();
    if (sending || cooldown > 0) return;
    setSending(true); setMessage("");
    const { error } = await client.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${window.location.origin}/admin`, shouldCreateUser: true },
    });
    setMessage(authMessage(error));
    setCooldown(60);
    setSending(false);
  }

  return (
    <main className="admin-gate">
      <div className="admin-gate-card">
        <img src="/images/passageway-logo.png" alt="Passageway Consulting" />
        <p className="admin-kicker">Passageway Admin</p>
        <h1>A calm place to keep the website growing.</h1>
        <p>Enter an invited Passageway email address. We’ll send you a secure one-time sign-in link.</p>
        <form className="admin-login-form" onSubmit={(event) => void sendLink(event)}>
          <label><span>Email address</span><input type="email" autoComplete="email" required disabled={sending} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
          <button className="admin-primary-button" disabled={sending || cooldown > 0}>{sending ? "Sending…" : cooldown > 0 ? `Try again in ${cooldown}s` : "Send secure sign-in link"}</button>
        </form>
        {message && <p className="admin-login-message" role="status">{message}</p>}
        <Link href="/">Return to the website</Link>
      </div>
    </main>
  );
}

function authMessage(error: { message?: string; status?: number; code?: string } | null) {
  if (!error) return "Your secure sign-in link is on its way. Check your inbox and open it on this device.";
  const detail = `${error.code ?? ""} ${error.message ?? ""}`.toLowerCase();
  if (error.status === 429 || detail.includes("rate limit") || detail.includes("too many")) {
    return "Too many sign-in emails were requested recently. Please wait a little while before trying again.";
  }
  return "We couldn’t send a sign-in link just now. Please check the email address and try again.";
}

function AccessPanel({ client, email, message }: { client: SupabaseClient; email: string; message: string }) {
  return (
    <main className="admin-gate">
      <div className="admin-gate-card">
        <img src="/images/passageway-logo.png" alt="Passageway Consulting" />
        <p className="admin-kicker">Passageway Admin</p>
        <h1>This email has not been invited yet.</h1>
        <p>{message || `You are signed in as ${email}. Ask a Passageway administrator to add this address under Admin users.`}</p>
        <button className="admin-primary-button" onClick={() => void client.auth.signOut()}>Use another email</button>
        <Link href="/">Return to the website</Link>
      </div>
    </main>
  );
}

function LoadingPanel() {
  return <main className="admin-gate"><div className="admin-gate-card"><p className="admin-kicker">Passageway Admin</p><h1>Opening the Passageway…</h1></div></main>;
}

function PreparingPanel() {
  return <main className="admin-gate"><div className="admin-gate-card"><img src="/images/passageway-logo.png" alt="Passageway Consulting" /><p className="admin-kicker">Passageway Admin</p><h1>The admin space is being connected.</h1><p>The website is ready; its Passageway-owned database connection still needs to be added before sign-in can open.</p><Link href="/">Return to the website</Link></div></main>;
}
