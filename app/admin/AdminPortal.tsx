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
  const [recoveringPassword, setRecoveringPassword] = useState(false);

  useEffect(() => {
    if (!client) return;
    let active = true;
    let authorizedUserId: string | null = null;
    let validatingUserId: string | null = null;

    async function acceptSession(next: Session | null) {
      if (!active) return;
      setSession(next);
      if (!next) {
        authorizedUserId = null;
        validatingUserId = null;
        setUser(null);
        setAccessError("");
        setLoading(false);
        return;
      }

      if (authorizedUserId === next.user.id || validatingUserId === next.user.id) return;
      if (authorizedUserId && authorizedUserId !== next.user.id) setUser(null);
      validatingUserId = next.user.id;
      setAccessError("");
      setLoading(true);
      try {
        const response = await fetch("/api/admin/content?collection=services", {
          cache: "no-store",
          headers: { authorization: `Bearer ${next.access_token}` },
        });
        const payload = await response.json() as { user?: CmsUser; error?: string };
        if (!response.ok || !payload.user) throw new Error(payload.error || "This email has not been invited to Passageway Admin.");
        if (active) {
          authorizedUserId = next.user.id;
          setUser(payload.user);
        }
      } catch (error) {
        if (active) {
          authorizedUserId = null;
          setUser(null);
          setAccessError(error instanceof Error ? error.message : "Passageway Admin access is unavailable.");
        }
      } finally {
        if (active) {
          validatingUserId = null;
          setLoading(false);
        }
      }
    }

    void client.auth.getSession().then(({ data }) => acceptSession(data.session));
    const { data: listener } = client.auth.onAuthStateChange((event, next) => {
      if (event === "PASSWORD_RECOVERY") setRecoveringPassword(true);
      if (event === "SIGNED_OUT") setRecoveringPassword(false);
      void acceptSession(next);
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, [client]);

  if (!config || !client) return <PreparingPanel />;
  if (recoveringPassword && session) return <PasswordSetupPanel client={client} onComplete={() => setRecoveringPassword(false)} />;
  if (session && user) {
    return <AdminDashboard user={user} accessToken={session.access_token} onSignOut={async () => { await client.auth.signOut(); }} />;
  }
  if (loading) return <LoadingPanel />;
  if (session) return <AccessPanel client={client} email={session.user.email ?? "this email"} message={accessError} />;
  return <SignInPanel client={client} />;
}

function SignInPanel({ client }: { client: SupabaseClient }) {
  const [mode, setMode] = useState<"password" | "link">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  async function signInWithPassword(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    setSending(true); setMessage("");
    const { error } = await client.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    setMessage(passwordAuthMessage(error));
    setSending(false);
  }

  async function requestPasswordSetup() {
    if (sending || cooldown > 0) return;
    if (!email.trim()) {
      setMessage("Enter your Passageway admin email first, then request a password setup email.");
      return;
    }
    setSending(true); setMessage("");
    const { error } = await client.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/admin`,
    });
    setMessage(passwordResetMessage(error));
    setCooldown(60);
    setSending(false);
  }

  return (
    <main className="admin-gate">
      <div className="admin-gate-card">
        <img src="/images/passageway-logo.png" alt="Passageway Consulting" />
        <p className="admin-kicker">Passageway Admin</p>
        <h1>A calm place to keep the website growing.</h1>
        <p>Sign in with an invited Passageway email. Use a password for everyday access or request a secure email link.</p>
        <div className="admin-auth-tabs" aria-label="Choose a sign-in method">
          <button type="button" className={mode === "password" ? "active" : ""} aria-pressed={mode === "password"} onClick={() => { setMode("password"); setMessage(""); }}>Password</button>
          <button type="button" className={mode === "link" ? "active" : ""} aria-pressed={mode === "link"} onClick={() => { setMode("link"); setMessage(""); }}>Email link</button>
        </div>
        <form className="admin-login-form" onSubmit={(event) => void (mode === "password" ? signInWithPassword(event) : sendLink(event))}>
          <label><span>Email address</span><input type="email" autoComplete="email" required disabled={sending} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
          {mode === "password" && <label><span>Password</span><input type="password" autoComplete="current-password" required minLength={8} disabled={sending} value={password} onChange={(event) => setPassword(event.target.value)} /></label>}
          <button className="admin-primary-button" disabled={sending || (mode === "link" && cooldown > 0)}>{sending ? "Please wait…" : mode === "password" ? "Sign in" : cooldown > 0 ? `Try again in ${cooldown}s` : "Send secure sign-in link"}</button>
        </form>
        {mode === "password" && <button className="admin-text-button" type="button" disabled={sending || cooldown > 0} onClick={() => void requestPasswordSetup()}>{cooldown > 0 ? `Email available again in ${cooldown}s` : "Set or reset your password"}</button>}
        {message && <p className="admin-login-message" role="status">{message}</p>}
        <Link href="/">Return to the website</Link>
      </div>
    </main>
  );
}

function passwordAuthMessage(error: { message?: string; status?: number; code?: string } | null) {
  if (!error) return "Signing you in…";
  const detail = `${error.code ?? ""} ${error.message ?? ""}`.toLowerCase();
  if (error.status === 429 || detail.includes("rate limit") || detail.includes("too many")) {
    return "Too many sign-in attempts were made recently. Please wait a little while before trying again.";
  }
  return "That email and password combination was not recognized. Check the details or set a new password.";
}

function passwordResetMessage(error: { message?: string; status?: number; code?: string } | null) {
  if (!error) return "If this is an invited Passageway email, a password setup message is on its way.";
  const detail = `${error.code ?? ""} ${error.message ?? ""}`.toLowerCase();
  if (error.status === 429 || detail.includes("rate limit") || detail.includes("too many")) {
    return "Too many account emails were requested recently. Please wait a little while before trying again.";
  }
  return "We couldn’t send a password setup message just now. Please check the email address and try again.";
}

function PasswordSetupPanel({ client, onComplete }: { client: SupabaseClient; onComplete: () => void }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function savePassword(event: React.FormEvent) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("The passwords do not match yet.");
      return;
    }
    setSaving(true); setMessage("");
    const { error } = await client.auth.updateUser({ password });
    if (error) {
      setMessage(error.message || "We couldn’t save that password. Please try another one.");
      setSaving(false);
      return;
    }
    window.history.replaceState({}, "", "/admin");
    onComplete();
  }

  return (
    <main className="admin-gate">
      <div className="admin-gate-card">
        <img src="/images/passageway-logo.png" alt="Passageway Consulting" />
        <p className="admin-kicker">Passageway Admin</p>
        <h1>Choose your admin password.</h1>
        <p>Use at least eight characters and save it in a trusted password manager.</p>
        <form className="admin-login-form" onSubmit={(event) => void savePassword(event)}>
          <label><span>New password</span><input type="password" autoComplete="new-password" required minLength={8} disabled={saving} value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          <label><span>Confirm password</span><input type="password" autoComplete="new-password" required minLength={8} disabled={saving} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></label>
          <button className="admin-primary-button" disabled={saving}>{saving ? "Saving…" : "Save password"}</button>
        </form>
        {message && <p className="admin-login-message" role="status">{message}</p>}
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
