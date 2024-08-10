import type { Metadata } from "next";
import "../globals.css";
import { CartProvider } from "./_context/cart";
import AuthProvider from "../_providers/auth";
import Footer from "./_components/footer";
import { Toaster } from "../_components/ui/sonner";

export const metadata: Metadata = {
  title: "DevShop",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex h-screen flex-col">
        <AuthProvider>
          <CartProvider>
            <div className="flex-1">{children}</div>
            <Footer />
          </CartProvider>
        </AuthProvider>

        <Toaster />
      </body>
    </html>
  );
}
