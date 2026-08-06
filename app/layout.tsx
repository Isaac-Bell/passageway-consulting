import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://passagewayconsulting.com";
const siteTitle =
  "Emotional Health Consulting for Women | Passageway Consulting";
const siteDescription =
  "Compassionate emotional health and life consulting for women through one-to-one sessions, workshops, and cohorts with Hannah Spacek and Kimberly.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Passageway Consulting",
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Passageway Consulting",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/hannah-kimberly.webp",
        width: 1400,
        height: 1120,
        alt: "Hannah Spacek and Kimberly of Passageway Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/hannah-kimberly.webp"],
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Passageway Consulting",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/passageway-logo.png`,
        contentUrl: `${siteUrl}/images/passageway-logo.png`,
        width: 1200,
        height: 907,
      },
      image: `${siteUrl}/images/hannah-kimberly.webp`,
      description: siteDescription,
      email: "hello@passagewayconsulting.com",
      founder: [
        {
          "@type": "Person",
          name: "Hannah Spacek",
          jobTitle: "Life Consultant, Naturopath, and Certified Health Coach",
        },
        {
          "@type": "Person",
          name: "Kimberly",
          jobTitle: "Life Consultant",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "hello@passagewayconsulting.com",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Passageway Consulting",
      description: siteDescription,
      inLanguage: "en-US",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#emotional-health-consulting`,
      name: "Emotional Health and Life Consulting for Women",
      serviceType: "Emotional health and life consulting",
      url: siteUrl,
      description:
        "One-to-one consulting, workshops, and cohorts supporting women through compassion, regulation, and empowerment.",
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      audience: {
        "@type": "PeopleAudience",
        suggestedGender: "female",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
