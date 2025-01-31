import "@/shared/styles/globals.css";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Gravidot: A brainstorming tool with multi-touch 🗯️🤏🎶",
  description:
    "A brainstorming and mind mapping service that connects ideas and supports real-time collaboration with an intuitive multi-touch interface.",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          WebkitUserSelect: "none",
          KhtmlUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
        }}
      >
        {children}
      </body>
    </html>
  );
}
