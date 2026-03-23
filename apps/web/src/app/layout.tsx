import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MoltStream — AI-Powered Streaming Agents",
  description:
    "Launch autonomous AI streamers on Kick, YouTube & Twitch. MoltStream provides the infrastructure to deploy, manage and monetize AI-driven live streams.",
  openGraph: {
    title: "MoltStream — AI-Powered Streaming Agents",
    description:
      "Launch autonomous AI streamers on Kick, YouTube & Twitch.",
    type: "website",
    url: "https://moltstream.com",
    siteName: "MoltStream",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoltStream — AI-Powered Streaming Agents",
    description:
      "Launch autonomous AI streamers on Kick, YouTube & Twitch.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={ibmPlexMono.variable}>
      <head>
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
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
