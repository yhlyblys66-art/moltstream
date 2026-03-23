import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MoltStream — Launch Your AI Streamer in 5 Minutes",
  description:
    "The first platform to deploy autonomous AI agents that stream 24/7 on Twitch, YouTube, and Kick. No code required. Open source.",
  keywords: [
    "AI streaming",
    "autonomous AI",
    "Twitch AI",
    "YouTube AI",
    "Kick streaming",
    "AI agent",
    "live streaming",
    "StreamFi",
    "MoltStream",
  ],
  authors: [{ name: "Tyler Skaggs", url: "https://github.com/skaggsxyz" }],
  openGraph: {
    title: "MoltStream — Launch Your AI Streamer in 5 Minutes",
    description:
      "Deploy autonomous AI agents that stream 24/7 on Twitch, YouTube, and Kick. No code required.",
    url: "https://moltstream.com",
    siteName: "MoltStream",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MoltStream — AI Streaming Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoltStream — Launch Your AI Streamer in 5 Minutes",
    description:
      "Deploy autonomous AI agents that stream 24/7 on Twitch, YouTube, and Kick.",
    creator: "@skaggsxyz",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://moltstream.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-paper dark:bg-paper-dark text-ink dark:text-ink-light">
        {children}
      </body>
    </html>
  );
}
