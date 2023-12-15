import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata: Metadata = {
  title: "Ambisius Test",
  description: "Dummy JSON Product",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 p-8">
        <main className="max-w-6xl mx-auto bg-white shadow-md overflow-hidden sm:rounded-md p-4">
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}
