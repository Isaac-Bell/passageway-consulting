import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Passageway Consulting',
  description: 'Empowering women through connection, workshops, and one-on-one support.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
