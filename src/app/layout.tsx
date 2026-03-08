import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Arjun Industries | Welding, Metal & Fabrication Work Specialist",
  description:
    "Arjun Industries provides welding, metal, and fabrication work for sheds, gates, grills, and farm equipment in and around Bhopal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-slate-800 font-sans antialiased">
        <div className="min-h-screen bg-stone-50 text-slate-800 flex flex-col smooth-fade">
          {children}
        </div>
      </body>
    </html>
  );
}


