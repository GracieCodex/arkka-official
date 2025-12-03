import { AnalyticsWrapper } from "../components/analytics";
import { Container } from "../components/container";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import "../styles/globals.css";
import ThemeProvider from "../components/ui/ThemeProvider";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
import FloatingAI from "../components/floating-ai";
import { CommandMenu } from "../components/command-menu";

export const metadata: Metadata = {
  title: "Arkka OS - Digital Team Platform",
  description: "Manage issues, track progress, and deliver products faster with Arkka OS. Built for modern teams.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1"
        />
      </head>
      <body>
        <ThemeProvider>
          <div>
            <Header />
            <CommandMenu />
            <main className="bg-page-gradient pt-navigation-height">
              {children}
            </main>
            <Footer />
          </div>
          <FloatingAI />
        </ThemeProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
