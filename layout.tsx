import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoVision — A second life starts with a closer look",
  description: "Turn a photo of everyday waste into a small action for a better planet. Identify, understand, and dispose responsibly.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
