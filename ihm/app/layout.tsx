import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Providers } from "./providers";
import "./globals.css";

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
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
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
