import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import MainWrapper from "@/components/layout/main";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: "jApp",
  description: "Track your job applications with ease.",
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <MainWrapper>
          {children}
        </MainWrapper>
      </body>
    </html>
  );
}
