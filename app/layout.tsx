import type { Metadata } from "next";
import { Chakra_Petch, Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Background from "@/app/components/Background";
import NavBar from "@/app/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OverCounter",
  description: "Overwatch hero counters, synergies and team compositions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${chakraPetch.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-8">
        <Background />
        <NavBar />
        {children}
        <footer className="mt-auto border-t border-[var(--border)] px-4 pt-6 text-center text-xs leading-relaxed text-[var(--muted)]">
          <p className="mx-auto max-w-3xl">
            OverCounter is an unofficial, non-commercial fan project and is not
            affiliated with, endorsed by, or sponsored by Blizzard Entertainment
            or the Overwatch franchise. Overwatch, its heroes, and all related
            assets, names and imagery are trademarks and copyrights of Blizzard
            Entertainment. Hero data is provided by the community-run OverFast
            API.
          </p>
        </footer>
      </body>
    </html>
  );
}
