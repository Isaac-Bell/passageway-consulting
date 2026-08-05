import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Passageway Consulting | Connect. Heal. Empower.",
  description:
    "One-to-one support, workshops, courses, and cohorts for women moving through change with connection, healing, and confidence.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
