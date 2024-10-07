import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Providers } from "./providers";

import "./globals.css";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body>
        <Providers>
          <Navbar /> {/* Ajoutez la Navbar ici */}
          {children}
          <Footer /> {/* Ajoutez le Footer ici */}
        </Providers>
      </body>
    </html>
  );
}
