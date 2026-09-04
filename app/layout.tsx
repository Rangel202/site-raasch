import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/CartProvider";
import CartDrawer from "./components/CartDrawer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/WhatsAppFab";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.raasch.com.br"),
  title: {
    default: "Raasch — Jóias, Iluminação e Decoração",
    template: "%s · Raasch",
  },
  description:
    "Uma loja repleta de desejos. Jóias, iluminação e decoração em Porto Alegre desde 1989 — mais de 14.000 itens e atendimento personalizado.",
  keywords: [
    "joias Porto Alegre",
    "iluminação",
    "lustres de cristal",
    "decoração",
    "móveis",
    "Raasch",
  ],
  openGraph: {
    title: "Raasch — Jóias, Iluminação e Decoração",
    description:
      "Uma loja repleta de desejos. Jóias, iluminação e decoração em Porto Alegre desde 1989.",
    locale: "pt_BR",
    type: "website",
    siteName: "Raasch",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFab />
        </CartProvider>
      </body>
    </html>
  );
}
