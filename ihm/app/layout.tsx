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
        {/* Votre code de head */}
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
