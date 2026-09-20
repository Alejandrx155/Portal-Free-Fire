import type { Metadata, Viewport } from "next";
import { Chakra_Petch, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "FREE FIRE · Portal de fans de Free Fire, no oficial",
    template: "%s · FREE FIRE",
  },
  description:
    "Portal no oficial de fans de Free Fire en español: simuladores, generadores, calculadoras, sensibilidad, códigos, personajes, armas y guías. Independiente de Garena.",
  applicationName: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    siteName: SITE.name,
    locale: "es_ES",
    url: SITE.url,
  },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  themeColor: "#0b0f19",
  width: "device-width",
  initialScale: 1,
};

const webRootSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "es",
  description: SITE.claim,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${chakra.variable} ${manrope.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k="radarff.theme";var t=localStorage.getItem(k);if(t)document.documentElement.dataset.theme=t;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-full focus:bg-warn focus:text-ink focus:px-4 focus:py-2"
        >
          Saltar al contenido
        </a>
        <AppHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <AppFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webRootSchema) }}
        />
      </body>
    </html>
  );
}
